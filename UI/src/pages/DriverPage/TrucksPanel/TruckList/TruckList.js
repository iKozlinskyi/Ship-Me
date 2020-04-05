import React from 'react';
import TruckItem from '../TruckItem/TruckItem';
import {ListGroup} from 'react-bootstrap';

const TruckList = ({trucks, onTruckSelect}) => {
  return (
    <ListGroup>
      {trucks.map((truck, idx) => {
        return (
          <TruckItem
            key={truck._id}
            truck={truck}
            idx={idx}
            onTruckSelect={onTruckSelect}
          />
        );
      })}
    </ListGroup>
  );
};

export default TruckList;
