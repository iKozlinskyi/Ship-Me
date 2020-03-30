const NOT_AUTHORIZED = 'Not authorized to access this resource';
const WRONG_CREDENTIALS = 'Wrong credentials';
const USERNAME_TAKEN = 'Username taken';
const USERNAME_BLANK = 'Username cannot be blank';
const PASSWORD_BLANK = 'Password cannot be blank';
const USER_LACKS_AUTHORITY = 'User lacks authority';
const TRUCK_NOT_FOUND_BY_ID = 'Cannot find truck with given id';
const LOAD_NOT_FOUND_BY_ID = 'Cannot find load with given id';
const NO_LOAD_ASSIGNED = 'Driver does not have a load assigned';
const NO_TRUCK_ASSIGNED = 'Driver does not have a truck assigned';
const CANNOT_CHANGE_DATA_OL = 'Not possible to change truck data while on load';
const CANNOT_REASSIGN_TRUCK_OL =
    'Not possible change assigned truck while on load';
const CANNOT_CHANGE_DATA_ASSIGNED_TRUCK =
    'Not possible to change assigned truck data';
const WRONG_OLD_PASSWORD = 'Wrong old password';
const TOKEN_NOT_VALID = 'Token not valid';

module.exports = {
  NOT_AUTHORIZED,
  WRONG_CREDENTIALS,
  USERNAME_TAKEN,
  USERNAME_BLANK,
  PASSWORD_BLANK,
  USER_LACKS_AUTHORITY,
  TRUCK_NOT_FOUND_BY_ID,
  LOAD_NOT_FOUND_BY_ID,
  NO_LOAD_ASSIGNED,
  NO_TRUCK_ASSIGNED,
  CANNOT_CHANGE_DATA_OL,
  CANNOT_REASSIGN_TRUCK_OL,
  CANNOT_CHANGE_DATA_ASSIGNED_TRUCK,
  WRONG_OLD_PASSWORD,
  TOKEN_NOT_VALID,
};
