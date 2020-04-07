import axios from 'axios';
import {CHANGE_PASSWORD_URL} from '../globals/routeConstants';

export const postChangePassword = (userId, passwordData) => {
  return axios.post(CHANGE_PASSWORD_URL(userId), passwordData)
      .then((response) => response.data);
};
