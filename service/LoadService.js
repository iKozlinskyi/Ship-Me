const Load = require('../model/load/load.model');
const {NEW, POSTED} = require('../constants/loadStatuses');
const truckService = require('./TruckService');

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

  setStatusForLoad(status, load) {
    return load.updateOne({status});
  }

  async updateById(id, editedLoadData) {
    await Load.findByIdAndUpdate(id, editedLoadData);
    return this.findById(id);
  }

  async createLoad(loadDto) {
    // 2 requests to db - this is not good.
    // TODO: clarify the status change for load
    const newLoad = await this.save(loadDto);

    await this.setStatusForLoad(POSTED, newLoad);
    const foundTruck = await truckService.findTruckForLoad(newLoad);

    if (!foundTruck) {
      await this.setStatusForLoad(NEW, newLoad);
    }
    return this.findById(newLoad);
  }
}

module.exports = new LoadService();
