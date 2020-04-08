import React from 'react';
import {Button} from 'react-bootstrap';
import {get} from 'lodash';

const LoadDetails = ({
  load = {},
  setIsEditMode,
  onLoadDelete,
}) => {
  const dimensions = get(load, 'dimensions', '');
  const handleLoadDelete = async () => {
    await onLoadDelete(load._id);
  };

  return (
    <div>
      <div>
        <h4>Load details</h4>
        <div>Name: {load.name}</div>
        <div>Payload: {load.payload}</div>
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
        >
            Edit
        </Button>
        <Button
          variant="danger"
          onClick={handleLoadDelete}
          className="mr-3"
        >
              Delete
        </Button>
      </div>
    </div>
  );
};

export default LoadDetails;
