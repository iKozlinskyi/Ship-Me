import React from 'react';
import {capitalize} from 'lodash';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const UserAccount = ({currentUser}) => {
  const createdAtMoment =
      moment(currentUser.createdAt).format('DD.MM.YYYY HH:mm');

  return (
    <div>
      <h2>Account Details:</h2>
      <div>Username: {currentUser.username}</div>
      <div>Role: {capitalize(currentUser.role)}</div>
      <div>Account created at: {createdAtMoment}</div>

      <LinkContainer to="/change-password">
        <Button>Change Password</Button>
      </LinkContainer>
    </div>
  );
};

export default UserAccount;
