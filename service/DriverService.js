const Driver = require('../model/driver/driver.model');
const Truck = require('../model/truck/truck.model');
const {USER_LACKS_AUTHORITY} = require('../constants/errors');

class DriverService {
  // This doesn`t look good
  // TODO: it smells
  async assignTruck(driverId, truckId) {
    const newTruck = await Truck.findById(truckId);
    const driver = await Driver.findById(driverId).populate('truck').exec();
    const oldTruck = driver.truck;

    if (oldTruck) {
      await oldTruck.update({$unset: {assignedTo: ''}});
    }
    await newTruck.update({assignedTo: driver});
    await driver.update({truck: newTruck});


    if (!driver.equals(newTruck.createdBy)) {
      throw new Error(USER_LACKS_AUTHORITY);
    }

    return Truck.findById(newTruck);
  }
}

module.exports = new DriverService();
