import React from 'react';
import TruckItem from '../TruckItem/TruckItem';
import {ListGroup} from 'react-bootstrap';

const TruckList = ({
  trucks,
  onTruckSelect,
  selectedTruckIdx,
  onSetIsEditMode,
}) => {
  return (
    <ListGroup>
      {trucks.map((truck, idx) => {
        return (
          <TruckItem
            key={truck._id}
            truck={truck}
            idx={idx}
            onTruckSelect={onTruckSelect}
            active={selectedTruckIdx === idx}
          />
        );
      })}
      <ListGroup.Item
        action
        active={selectedTruckIdx === -1}
        onClick={() => {
          onSetIsEditMode(true);
          onTruckSelect(-1);
        }}
        variant="success"
        eventKey={-1}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            + Add truck
          </div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default TruckList;
