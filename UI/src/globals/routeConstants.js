export const BASE_API_URL = 'http://localhost:5050/api';

export const LOGIN_URL = BASE_API_URL + '/login';

export const REGISTER_URL = BASE_API_URL + '/register';

export const USERNAME_AVAILABLE_BASE_URL = BASE_API_URL + '/users/';

export const APP_NAME = 'ship-me-app';

export const CURRENT_USER_URL = BASE_API_URL + '/me';

export const GET_TRUCKS_URL = BASE_API_URL + '/trucks';

export const UPDATE_TRUCK_URL =
    (truckId) => `${BASE_API_URL}/trucks/${truckId}`;

export const ASSIGN_TRUCK_URL =
  (userId) => `${BASE_API_URL}/users/${userId}/assignedTrucks`;

export const DELETE_TRUCK_URL =
    (truckId) => `${BASE_API_URL}/trucks/${truckId}`;

export const CREATE_TRUCK_URL = BASE_API_URL + '/trucks';
