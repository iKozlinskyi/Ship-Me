import React, {useEffect, useState} from 'react';
import TruckList from './TruckList/TruckList';
import {Col, Row} from 'react-bootstrap';
import TruckDetails from './TruckDetails/TruckDetails';
import EditTruckForm from './EditTruckForm/EditTruckForm';
import {
  deleteTruck,
  getTrucks,
  postAssignTruck, postCreateTruck,
  putTruck,
} from '../../../api/trucksApi';

const TrucksPanel = ({currentUser}) => {
  const [trucks, setTrucks] = useState([]);
  const [selectedTruckIdx, setSelectedTruckIdx] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isTrucksLoaded, setIsTrucksLoaded] = useState(false);

  const fetchTrucks = async () => {
    const {trucks} = await getTrucks();
    setTrucks(trucks);

    if (trucks.length === 0) {
      setIsEditMode(true);
    }
  };

  useEffect(() => {
    fetchTrucks().then(() => {
      setIsTrucksLoaded(true);
      setSelectedTruckIdx(0);
    });
  }, []);

  const updateTrucks = async (truckId, editedTruckData) => {
    await putTruck(truckId, editedTruckData);
    await fetchTrucks();
  };

  const assignTruck = async (truckId) => {
    await postAssignTruck(currentUser._id, truckId);
    await fetchTrucks();
  };

  const removeTruck = async (truckId) => {
    await deleteTruck(truckId);
    await fetchTrucks();
  };

  const createTruck = async (truckData) => {
    await postCreateTruck(truckData);
    await fetchTrucks();
    const lastTruckIdx = trucks.length || 1;
    setSelectedTruckIdx(lastTruckIdx - 1);
  };

  const handleTruckSelect = (truckIdx) => {
    setSelectedTruckIdx(truckIdx);
    if (truckIdx !== -1) {
      setIsEditMode(false);
    }
  };

  const selectedTruck = trucks[selectedTruckIdx];
  const hasUserTrucks = trucks.length !== 0;


  return (
    <>
      <Row>
        <Col>
          {hasUserTrucks ? <h4>Here are your trucks: </h4> :
              <h4>Looks like you don`t have any trucks yet.
                You can add it below</h4>}
        </Col>
      </Row>
      {isTrucksLoaded && <Row>
        <Col md={4}>
          <TruckList
            trucks={trucks}
            onTruckSelect={handleTruckSelect}
            selectedTruckIdx={selectedTruckIdx}
            onSetIsEditMode={setIsEditMode}
          />

        </Col>
        <Col md={8}>
          {(isEditMode ?
              <EditTruckForm
                truck={selectedTruck}
                setIsEditMode={setIsEditMode}
                onUpdateTrucks={updateTrucks}
                truckIdx={selectedTruckIdx}
                onCreateTruck={createTruck}
              /> :
              <TruckDetails
                truck={selectedTruck}
                setIsEditMode={setIsEditMode}
                onTruckAssign={assignTruck}
                onTruckDelete={removeTruck}
              />)
          }
        </Col>
      </Row>}
    </>
  );
};

export default TrucksPanel;
