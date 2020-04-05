import React from 'react';
import {Button, Tab} from 'react-bootstrap';
import {get} from 'lodash';

const TruckDetails = ({
  truck,
  setIsEditMode,
  truckIdx,
  onTruckAssign,
  onTruckDelete,
}) => {
  const dimensions = get(truck, 'dimensions', '');
  const isAssigned = !!truck.assignedTo;
  const handleTruckAssign = () => {
    onTruckAssign(truck._id);
  };
  const handleTruckDelete = async () => {
    await onTruckDelete(truck._id);
  };

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
        <div className="mt-3">
          <Button
            variant="primary"
            className="mr-3"
            onClick={() => setIsEditMode(true)}
            disabled={isAssigned}
          >
            Edit
          </Button>
          {!isAssigned && <>
            <Button
              variant="danger"
              onClick={handleTruckDelete}
              className="mr-3"
            >
              Delete
            </Button>
            <Button
              variant="success"
              onClick={handleTruckAssign}
            >
              Assign
            </Button>
          </>
          }
        </div>
      </Tab.Pane>
    </Tab.Content>
  );
};

export default TruckDetails;
