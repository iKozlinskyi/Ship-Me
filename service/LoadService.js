const Load = require('../model/load/load.model');

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
}

module.exports = new LoadService();
