import React, {useEffect, useState} from 'react';
import TruckList from './TruckList/TruckList';
import {Col, Tab, Row, Button} from 'react-bootstrap';
import TruckDetails from './TruckDetails/TruckDetails';
import {get} from 'lodash';

const TrucksPanel = ({trucks}) => {
  const firstTruck = get(trucks, '[0]', '');
  const [selectedTruck, setSelectedTruck] = useState('');
  // const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    setSelectedTruck({truck: firstTruck, number: 1});
  }, [firstTruck]);

  return (
    <Tab.Container
      id="truck-panel"
      defaultActiveKey="1"
    >
      <Row>
        <Col md={4}>
          <TruckList trucks={trucks} onTruckSelect={setSelectedTruck}/>
        </Col>
        <Col md={8}>
          <TruckDetails selectedTruck={selectedTruck}/>
          <Button variant="primary" className="mt-3">Edit truck</Button>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TrucksPanel;
