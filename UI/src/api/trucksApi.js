import axios from 'axios';
import {GET_TRUCKS} from '../globals/routeConstants';

export const getTrucks = () => {
  return axios.get(GET_TRUCKS)
      .then((response) => response.data);
};
