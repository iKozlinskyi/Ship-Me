import React, {useEffect, useState} from 'react';
import TruckList from './TruckList/TruckList';
import {Col, Tab, Row} from 'react-bootstrap';
import TruckDetails from './TruckDetails/TruckDetails';
import EditTruckForm from './EditTruckForm/EditTruckForm';
import {getTrucks, putTruck} from '../../../api/trucksApi';

const TrucksPanel = () => {
  const [trucks, setTrucks] = useState([]);
  const [selectedTruckIdx, setSelectedTruckIdx] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchTrucks = async () => {
    const response = await getTrucks();
    setTrucks(response.trucks);
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const updateTrucks = async (truckId, editedTruckData) => {
    await putTruck(truckId, editedTruckData);
    await fetchTrucks();
  };

  const selectedTruck = trucks[selectedTruckIdx];

  return (
    <Tab.Container
      id="truck-panel"
      defaultActiveKey="0"
    >
      <Row>
        <Col md={4}>
          <TruckList
            trucks={trucks}
            onTruckSelect={setSelectedTruckIdx}
          />
        </Col>
        <Col md={8}>
          {selectedTruck && (isEditMode ?
              <EditTruckForm
                truck={selectedTruck}
                setIsEditMode={setIsEditMode}
                onUpdateTrucks={updateTrucks}
                truckIdx={selectedTruckIdx}
              /> :
              <TruckDetails
                truck={selectedTruck}
                truckIdx={selectedTruckIdx}
                setIsEditMode={setIsEditMode}
              />)
          }
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TrucksPanel;
