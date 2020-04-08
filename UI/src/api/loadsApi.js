import axios from 'axios';
import {
  CREATE_LOAD_URL,
  DELETE_LOAD_URL,
  GET_LOADS_URL,
  UPDATE_LOAD_URL,
} from '../globals/routeConstants';

export const getLoads = () => {
  return axios.get(GET_LOADS_URL)
      .then((response) => response.data);
};

export const putLoad = (loadId, loadData) => {
  return axios.put(UPDATE_LOAD_URL(loadId), loadData)
      .then((response) => response.data);
};

export const deleteLoad = (loadId) => {
  return axios.delete(DELETE_LOAD_URL(loadId))
      .then((response) => response.data);
};

export const postCreateLoad = (loadData) => {
  return axios.post(CREATE_LOAD_URL, loadData)
      .then((response) => response.data);
};
