import React from 'react';
import {Button, Tab} from 'react-bootstrap';
import {get} from 'lodash';

const TruckDetails = ({truck={}, setEditMode, truckIdx}) => {
  const dimensions = get(truck, 'dimensions', '');
  return (
    <Tab.Content>
      <Tab.Pane eventKey={truckIdx}>
        <div>
          <h4>Truck details</h4>
          <div>Name: {truck.name}</div>
          <div>Max payload: {truck.maxPayload}</div>
          <div>
            Dimensions:
            <div>Width: {dimensions.width}</div>
            <div>Height: {dimensions.height}</div>
            <div>Length: {dimensions.length}</div>
          </div>
        </div>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => setEditMode(true)}
        >
          Edit truck
        </Button>
      </Tab.Pane>
    </Tab.Content>
  );
};

export default TruckDetails;
