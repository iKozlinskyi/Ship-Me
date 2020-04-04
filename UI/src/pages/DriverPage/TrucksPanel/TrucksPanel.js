import React, {useState} from 'react';
import TruckList from './TruckList/TruckList';
import {Col, Tab, Row} from 'react-bootstrap';
import TruckDetails from './TruckDetails/TruckDetails';
import {get} from 'lodash';

const TrucksPanel = ({trucks}) => {
  const firstTruckId = get(trucks, '[0]._id', '');
  const [selectedTruck, setSelectedTruck] = useState('');

  return (
    <Tab.Container
      id="truck-panel"
      defaultActiveKey={firstTruckId}
    >
      <Row>
        <Col md={4}>
          <TruckList trucks={trucks} onTruckSelect={setSelectedTruck}/>
        </Col>
        <Col md={8}>
          <TruckDetails truck={selectedTruck}/>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TrucksPanel;
