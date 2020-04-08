import React from 'react';
import LoadItem from '../LoadItem/LoadItem';
import {ListGroup} from 'react-bootstrap';

const LoadList = ({
  loads,
  onLoadSelect,
  selectedLoadIdx,
  onSetIsEditMode,
}) => {
  return (
    <ListGroup>
      {loads.map((load, idx) => {
        return (
          <LoadItem
            key={load._id}
            load={load}
            idx={idx}
            onLoadSelect={onLoadSelect}
            active={selectedLoadIdx === idx}
          />
        );
      })}
      <ListGroup.Item
        action
        active={selectedLoadIdx === -1}
        onClick={() => {
          onSetIsEditMode(true);
          onLoadSelect(-1);
        }}
        variant="success"
        eventKey={-1}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            + Create load
          </div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default LoadList;
