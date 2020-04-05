import React from 'react';
import {Badge, ListGroup} from 'react-bootstrap';

const TruckItem = ({idx, truck, onTruckSelect, active}) => {
  const isAssigned = !!truck.assignedTo;

  return (
    <ListGroup.Item
      action
      active={active}
      onClick={() => onTruckSelect(idx)}
      eventKey={idx}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {idx + 1}. {truck.name}
        </div>
        {isAssigned && <Badge variant="success">Assigned</Badge>}
      </div>
    </ListGroup.Item>
  );
};

export default TruckItem;
