import axios from 'axios';
import {
  ASSIGN_TRUCK_URL,
  CREATE_TRUCK_URL,
  DELETE_TRUCK_URL,
  GET_TRUCKS_URL,
  UPDATE_TRUCK_URL,
} from '../globals/routeConstants';

export const getTrucks = () => {
  return axios.get(GET_TRUCKS_URL)
      .then((response) => response.data);
};

export const putTruck = (truckId, truckData) => {
  return axios.put(UPDATE_TRUCK_URL(truckId), truckData)
      .then((response) => response.data);
};

export const postAssignTruck = (userId, truckId) => {
  return axios.post(ASSIGN_TRUCK_URL(userId), {truckId})
      .then((response) => response.data);
};

export const deleteTruck = (truckId) => {
  return axios.delete(DELETE_TRUCK_URL(truckId))
      .then((response) => response.data);
};

export const postCreateTruck = (truckData) => {
  return axios.post(CREATE_TRUCK_URL, truckData)
      .then((response) => response.data);
};
