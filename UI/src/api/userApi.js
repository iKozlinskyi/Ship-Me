import axios from 'axios';
import {CURRENT_USER_URL} from '../globals/routeConstants';

export const getCurrentUser = () => {
  return axios.get(CURRENT_USER_URL)
      .then((response) => response.data);
};
