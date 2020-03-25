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
}

module.exports = new TruckService();
