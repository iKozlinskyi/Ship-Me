import React from 'react';
import {ListGroup} from 'react-bootstrap';

const LoadItem = ({idx, load, onLoadSelect, active}) => {
  return (
    <ListGroup.Item
      action
      active={active}
      onClick={() => onLoadSelect(idx)}
      eventKey={idx}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {idx + 1}. {load.name}
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default LoadItem;
