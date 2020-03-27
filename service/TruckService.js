const Truck = require('../model/truck/truck.model');

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
    const newTruck = Truck.create(truckDto);
    return newTruck;
  }

  removeById(id) {
    Truck.findByIdAndDelete(id);
  }

  async updateById(id, editedTruckData) {
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

    return foundTrucks.length > 0 ? foundTrucks[0] : null;
  }
}

module.exports = new TruckService();
