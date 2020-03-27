const Truck = require('../model/truck/truck.model');

class TruckService {
  findAll() {
    return Truck.find();
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
}

module.exports = new TruckService();
