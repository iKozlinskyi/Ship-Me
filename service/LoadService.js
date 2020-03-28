const Load = require('../model/load/load.model');
const {NEW, POSTED} = require('../constants/loadStatuses');
const truckService = require('./TruckService');
const driverService = require('./DriverService');
const {ROUTE_TO_PICK_UP} = require('../constants/loadStates');
const {OL} = require('../constants/truckStatuses');

class LoadService {
  findAll() {
    return Load.find();
  }

  findByCreatedUserId(userId) {
    return Load.find({createdBy: userId});
  }

  async findById(id) {
    return Load.findById(id);
  }

  save(loadDto) {
    const newLoad = Load.create(loadDto);
    return newLoad;
  }

  removeById(id) {
    Load.findByIdAndDelete(id);
  }

  async updateById(id, editedLoadData) {
    await Load.findByIdAndUpdate(id, editedLoadData);
    return this.findById(id);
  }

  async createLoad(loadDto) {
    // 2 requests to db - this is not good.
    // TODO: clarify the status change for load
    const newLoad = await this.save(loadDto);

    await newLoad.update({status: POSTED});
    const foundTruck = await truckService.findTruckForLoad(newLoad);

    if (!foundTruck) {
      await newLoad.update({status: NEW});
      return this.findById(newLoad);
    }

    await foundTruck.update({status: OL});
    await newLoad.update({state: ROUTE_TO_PICK_UP});

    const assignedDriverId = foundTruck.assignedTo;

    return await driverService.assignLoad(assignedDriverId, newLoad._id);
  }
}

module.exports = new LoadService();
