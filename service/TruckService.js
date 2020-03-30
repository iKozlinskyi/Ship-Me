const Truck = require('../model/truck.model');
const {
  CANNOT_CHANGE_DATA_OL,
  CANNOT_CHANGE_DATA_ASSIGNED_TRUCK,
  TRUCK_NOT_FOUND_BY_ID,
  USER_LACKS_AUTHORITY,
} = require('../constants/errors');
const {IS} = require('../constants/truckStatuses');

class TruckService {
  findAll() {
    return Truck.find();
  }

  findByCreatedUserId(userId) {
    return Truck.find({createdBy: userId});
  }

  async findById(id) {
    const foundTruck = await Truck.findById(id);

    if (!foundTruck) {
      throw new Error(TRUCK_NOT_FOUND_BY_ID);
    }

    return foundTruck;
  }

  save(truckDto) {
    truckDto.status = IS;
    const newTruck = Truck.create(truckDto);
    return newTruck;
  }

  async remove(truck) {
    await this.checkTruckCanBeModified(truck);
    return Truck.findByIdAndDelete(truck);
  }

  async updateById(id, editedTruckData) {
    const truck = await Truck.findById(id).populate('createdBy');
    await this.checkTruckCanBeModified(truck);

    await truck.update(editedTruckData).exec();
    // This is done to trigger 'save' middleware
    const updTruck = await Truck.findById(truck);
    await updTruck.save();

    return updTruck;
  }

  async findTruckForLoad(load) {
    /** The aggregate function finds ALL unassigned trucks, and then filters
     *  them. In case of real application, without pre-defined truck sizes,
     *  I would leave it. But in our case, we could have matched load size and
     *  weight against truck types (we have only 3 of them), and if the payload
     *  could be carried only by largest truck, we can start our search on them,
     *  which would be more efficient.
     *
     *  Returns smallest possible truck for given load.
     */
    const foundTrucks = await Truck.aggregate([
      {
        $match: {
          'status': IS,
          'assignedTo': {$exists: true},
          'dimensions.width': {$gte: load.dimensions.width},
          'dimensions.length': {$gte: load.dimensions.length},
          'dimensions.height': {$gte: load.dimensions.height},
          'maxPayload': {$gte: load.payload},
        },
      },
      {
        $project: {
          capacityIndex: {
            $multiply: [
              '$dimensions.length',
              '$dimensions.height',
              '$dimensions.width',
              '$maxPayload',
            ],
          },
        },
      },
      {
        $sort: {capacityIndex: 1},
      },
      {
        $limit: 1,
      },
    ]);

    // the truck is found again to ensure its methods - to cast it to document
    return foundTrucks.length > 0 ? this.findById(foundTrucks[0]._id) : null;
  }

  isTruckAvailableForWork(truck) {
    return truck.status === IS && !!truck.assignedTo;
  }

  checkDriverReadWriteRights(driver, truck) {
    if (!driver.equals(truck.createdBy)) {
      throw new Error(USER_LACKS_AUTHORITY);
    }
  }

  async checkTruckCanBeModified(truck) {
    const populatedTruck = await truck.populate('createdBy').execPopulate();
    const truckOwner = populatedTruck.createdBy;

    if (truckOwner.assignedLoad) {
      throw new Error(CANNOT_CHANGE_DATA_OL);
    }
    if (populatedTruck.assignedTo) {
      throw new Error(CANNOT_CHANGE_DATA_ASSIGNED_TRUCK);
    }
  }
}

module.exports = new TruckService();
