import {DRIVER, SHIPPER} from '../constants/userRoles';
import {get} from 'lodash';

const driverLinks = [
  {to: '/trucks', name: 'My Trucks'},
  {to: '/assignedLoad', name: 'My Load'},
];

const shipperLinks = [
  {to: '/loads', name: 'My Loads'},
];


export const getNavbarLinksForUser = (user) => {
  const userRole = get(user, 'role', '');
  switch (userRole) {
    case DRIVER:
      return driverLinks;
    case SHIPPER:
      return shipperLinks;
    default:
      return [];
  }
};
