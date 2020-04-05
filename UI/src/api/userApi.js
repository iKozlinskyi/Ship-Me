import axios from 'axios';
import {CHANGE_PASSWORD_URL, CURRENT_USER_URL} from '../globals/routeConstants';

export const getCurrentUser = () => {
  return axios.get(CURRENT_USER_URL)
      .then((response) => response.data);
};

export const postChangePassword = (userId, passwordData) => {
  return axios.post(CHANGE_PASSWORD_URL(userId), passwordData)
      .then((response) => response.data);
};
