class TruckService {
  constructor() {
    this.trucks = [
      {id: 1, status: 'active', type: 'big'},
      {id: 2, status: 'not active', type: 'medium'},
    ];
  }

  findAll() {
    return [...this.trucks];
  }

  findById(id) {
    const foundTruck = this.trucks.find((truck) => truck.id === id);

    if (!foundTruck) {
      throw new Error(`Cannot find note with id ${id}`);
    }
    return foundTruck;
  }

  save(truckDto) {
    const newTruck = truckDto;

    this.trucks = [...this.trucks, newTruck];
    return newTruck;
  }
}

module.exports = new TruckService();
