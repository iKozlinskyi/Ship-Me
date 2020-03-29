const Truck = require('../model/truck/truck.model');
const {CANNOT_CHANGE_DATA_OL} = require('../constants/errors');
const {IS, OL} = require('../constants/truckStatuses');

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
      throw new Error();
    }

    return foundTruck;
  }

  save(truckDto) {
    truckDto.status = IS;
    const newTruck = Truck.create(truckDto);
    return newTruck;
  }

  removeById(id) {
    Truck.findByIdAndDelete(id);
  }

  async updateById(id, editedTruckData) {
    const truck = await Truck.findById(id);

    if (truck.status === OL) {
      throw new Error(CANNOT_CHANGE_DATA_OL);
    }
    await Truck.findByIdAndUpdate(id, editedTruckData);

    return this.findById(id);
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
          'maxPayload': {$gte: load.payload},
        },
      },
      {
        $addFields: {
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
      {
        $project: {
          capacityIndex: 0,
        },
      },
    ]);

    // the truck is found again to ensure its methods - to cast it to document
    return foundTrucks.length > 0 ? this.findById(foundTrucks[0]._id) : null;
  }
}

module.exports = new TruckService();
