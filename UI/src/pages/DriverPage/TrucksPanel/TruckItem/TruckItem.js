import React from 'react';
import {ListGroup} from 'react-bootstrap';

const TruckItem = ({idx, truck, onTruckSelect}) => {
  return (
    <ListGroup.Item
      action
      onClick={() => onTruckSelect(idx)}
      eventKey={idx}
    >
      <div>{idx + 1}. {truck.name}</div>
    </ListGroup.Item>
  );
};

export default TruckItem;
