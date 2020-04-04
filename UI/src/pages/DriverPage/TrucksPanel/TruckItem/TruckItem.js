import React from 'react';
import {ListGroup} from 'react-bootstrap';

const TruckItem = ({number, truck, onTruckSelect}) => {
  return (
    <ListGroup.Item
      action
      onClick={() => onTruckSelect({truck, number})}
      eventKey={number}
    >
      <div>{number}. {truck.name}</div>
    </ListGroup.Item>
  );
};

export default TruckItem;
