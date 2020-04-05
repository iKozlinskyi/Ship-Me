import axios from 'axios';
import {
  ASSIGN_TRUCK,
  DELETE_TRUCK,
  GET_TRUCKS,
  UPDATE_TRUCK,
} from '../globals/routeConstants';

export const getTrucks = () => {
  return axios.get(GET_TRUCKS)
      .then((response) => response.data);
};

export const putTruck = (truckId, truckData) => {
  return axios.put(UPDATE_TRUCK(truckId), truckData)
      .then((response) => response.data);
};

export const postAssignTruck = (userId, truckId) => {
  return axios.post(ASSIGN_TRUCK(userId), {truckId})
      .then((response) => response.data);
};

export const deleteTruck = (truckId) => {
  return axios.delete(DELETE_TRUCK(truckId))
      .then((response) => response.data);
};
