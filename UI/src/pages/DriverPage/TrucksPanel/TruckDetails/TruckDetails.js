import React from 'react';
import {Tab} from 'react-bootstrap';
import {get} from 'lodash';

const TruckDetails = ({truck}) => {
  const dimensions = get(truck, 'dimensions', '');

  return (
    <Tab.Content>
      <Tab.Pane eventKey={truck._id}>
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
      </Tab.Pane>
    </Tab.Content>
  );
};

export default TruckDetails;
