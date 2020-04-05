import axios from 'axios';
import {GET_TRUCKS, UPDATE_TRUCK} from '../globals/routeConstants';

export const getTrucks = () => {
  return axios.get(GET_TRUCKS)
      .then((response) => response.data);
};

export const putTruck = (truckId, truckData) => {
  return axios.put(UPDATE_TRUCK(truckId), truckData)
      .then((response) => response.data);
};
