const Driver = require('../model/driver.model');
const Truck = require('../model/truck.model');
const Load = require('../model/load.model');
const truckService = require('./TruckService');
const {
  CANNOT_REASSIGN_TRUCK_OL,
  USER_LACKS_AUTHORITY,
  NO_TRUCK_ASSIGNED,
  NO_LOAD_ASSIGNED,
} = require('../constants/errors');
const HttpError = require('../utils/HttpError');

class DriverService {
  // This doesn`t look good
  // TODO: it smells
  async assignTruck(driverId, truckId) {
    const newTruck = await Truck.findById(truckId);
    const driver = await Driver.findById(driverId).populate('truck').exec();

    if (!driver.equals(newTruck.createdBy)) {
      throw new HttpError(403, USER_LACKS_AUTHORITY);
    }
    if (driver.assignedLoad) {
      throw new HttpError(409, CANNOT_REASSIGN_TRUCK_OL);
    }

    const oldTruck = driver.truck;

    if (oldTruck) {
      await truckService.unassignDriverFromTruck(oldTruck.id);
    }
    await driver.update({truck: newTruck});
    newTruck.assignedTo = driver;
    await newTruck.save();

    return Truck.findById(newTruck);
  }

  async getAssignedDriverLoad(driverId) {
    const driver =
        await Driver.findById(driverId).populate('assignedLoad').exec();

    const {assignedLoad} = driver;

    if (!assignedLoad) {
      throw new HttpError(409, NO_LOAD_ASSIGNED);
    }

    return assignedLoad;
  }

  async getAssignedDriverTruck(driverDto) {
    const driver = await Driver.findById(driverDto).populate('truck').exec();
    const assignedTruck = driver.truck;

    if (!assignedTruck) {
      throw new HttpError(409, NO_TRUCK_ASSIGNED);
    }

    return assignedTruck;
  }

  // TODO: driver can reassign load while he is on load already - fix this
  async assignLoad(driverId, loadId) {
    const newLoad = await Load.findById(loadId);
    const driver =
        await Driver.findById(driverId).populate('assignedLoad').exec();

    await newLoad.update({assignedTo: driver});
    await newLoad.addLog(`Assigned to driver with id: ${driver._id}`);

    await driver.update({assignedLoad: newLoad});

    return Driver.findById(driverId);
  }
}

module.exports = new DriverService();
