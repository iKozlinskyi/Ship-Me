const Load = require('../model/load.model');
const {
  NEW,
  POSTED,
  ASSIGNED,
  SHIPPED,
} = require('../constants/loadStatuses');
const truckService = require('./TruckService');
const driverService = require('./DriverService');
const Truck = require('../model/truck.model');
const {IS, OL} = require('../constants/truckStatuses');
const {
  USER_LACKS_AUTHORITY,
  CANNOT_EDIT_NOT_NEW_LOAD,
} = require('../constants/errors');
const {DRIVER, SHIPPER} = require('../constants/userRoles');
const {
  ROUTE_TO_PICK_UP,
  ARRIVED_TO_DELIVERY,
  LOAD_NOT_FOUND_BY_ID,
} = require('../constants/loadStates');
const HttpError = require('../utils/HttpError');


class LoadService {
  findAll() {
    return Load.find();
  }

  findByCreatedUserId(userId) {
    return Load.find({createdBy: userId});
  }

  async findById(id) {
    const foundLoad = await Load.findById(id);
    if (!foundLoad) {
      throw new HttpError(404, LOAD_NOT_FOUND_BY_ID);
    }

    return foundLoad;
  }

  async save(loadDto) {
    const newLoad = await Load.create(loadDto);
    return newLoad.addLog('Load created');
  }

  remove(load) {
    if (load.status !== NEW) {
      throw new HttpError(409, CANNOT_EDIT_NOT_NEW_LOAD);
    }

    return Load.findByIdAndDelete(load);
  }

  async update(load, editedLoadData) {
    if (load.status !== NEW) {
      throw new HttpError(409, CANNOT_EDIT_NOT_NEW_LOAD);
    }

    await Load.findByIdAndUpdate(load, editedLoadData);
    return this.findById(load);
  }

  updateLoadStatus(load, newStatus) {
    load.status = newStatus;
    return load.addLog(`Changed status to ${newStatus}`);
  }

  async connectTruckAndLoad(truck, load) {
    if (load.status === NEW) {
      await this.updateLoadStatus(load, POSTED);
    }

    await truck.update({status: OL});
    const assignedDriverId = truck.assignedTo;

    await driverService.assignLoad(assignedDriverId, load._id);
    await this.updateLoadStatus(load, ASSIGNED);
    await this.performLoadStateChange(load, ROUTE_TO_PICK_UP);
  }

  async processNewLoad(loadDto) {
    const newLoad = await this.createLoad(loadDto);

    const foundTruck = await truckService.findTruckForLoad(newLoad);

    if (!foundTruck) {
      await this.updateLoadStatus(newLoad, NEW);
    } else {
      await this.connectTruckAndLoad(foundTruck, newLoad);
    }

    return Load.findById(newLoad);
  }

  async createLoad(loadDto) {
    const newLoad = await this.save(loadDto);
    return this.updateLoadStatus(newLoad, POSTED);
  }

  async finishDelivery(load) {
    await Load.findByIdAndUpdate(load._id, {status: SHIPPED});

    const updatedLoad = await Load.findById(load._id);
    await updatedLoad.addLog(`Change status to: ${SHIPPED}`);

    const populatedLoad =
        await updatedLoad.populate('assignedTo').execPopulate();
    const assignedDriver = populatedLoad.assignedTo;

    // TODO: Not sure if I need to save connection between driver
    // and load after successful shipment
    // await populatedLoad.update({$unset: {assignedTo: 1}});

    await assignedDriver.update({$unset: {assignedLoad: 1}});

    const truckId = assignedDriver.truck;

    await Truck.findByIdAndUpdate(truckId, {status: IS});
  }

  hasUserAuthorityForLoad(user, load) {
    switch (user.role) {
      case DRIVER:
        return load.equals(user.assignedLoad);
      case SHIPPER:
        return user.equals(load.createdBy);
      default:
        throw new HttpError(403, USER_LACKS_AUTHORITY);
    }
  }

  async performLoadStateChange(load, newState) {
    const updatedLoad =
        await Load.findByIdAndUpdate(load._id, {state: newState});
    await updatedLoad.addLog(`Change load state to: ${newState}`);

    if (newState === ARRIVED_TO_DELIVERY) {
      await this.finishDelivery(load);
    }

    return Load.findById(load._id);
  }

  async findLoadForTruck(truck) {
    /**
     *  Finds suitable load which was created first - so it works like a que
     *  (FIFO)
     */
    const foundLoads = await Load.aggregate([
      {
        $match: {
          'status': NEW,
          'dimensions.width': {$lte: truck.dimensions.width},
          'dimensions.length': {$lte: truck.dimensions.length},
          'dimensions.height': {$lte: truck.dimensions.height},
          'payload': {$lte: truck.maxPayload},
        },
      },
      {
        $project: {
          'createdAt': {$arrayElemAt: ['$logs.time', 0]},
        },
      },
      {
        $sort: {'createdAt': 1},
      },
      {
        $limit: 1,
      },
    ]);

    // Rehydrate the load doc
    return foundLoads.length > 0 ? this.findById(foundLoads[0]._id) : null;
  }
}

module.exports = new LoadService();
