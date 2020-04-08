import React, {useEffect, useState} from 'react';
import LoadList from './LoadList/LoadList';
import {Col, Row} from 'react-bootstrap';
import LoadDetails from './LoadDetails/LoadDetails';
import EditLoadForm from './EditLoadForm/EditLoadForm';
import {
  deleteLoad,
  getLoads,
  postCreateLoad,
  putLoad,
} from '../../../api/loadsApi';

const LoadsPanel = ({}) => {
  const [loads, setLoads] = useState([]);
  const [selectedLoadIdx, setSelectedLoadIdx] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadsLoaded, setIsLoadsLoaded] = useState(false);

  const fetchLoads = async () => {
    const {loads} = await getLoads();
    setLoads(loads);

    if (loads.length === 0) {
      setIsEditMode(true);
    }
  };

  useEffect(() => {
    fetchLoads().then(() => {
      setIsLoadsLoaded(true);
      setSelectedLoadIdx(0);
    });
  }, []);

  const updateTrucks = async (loadId, editedLoadData) => {
    await putLoad(loadId, editedLoadData);
    await fetchLoads();
  };

  const removeLoad = async (loadId) => {
    await deleteLoad(loadId);
    await fetchLoads();
  };

  const createLoad = async (loadData) => {
    await postCreateLoad(loadData);
    await fetchLoads();
    const lastLoadIdx = loads.length || 1;
    setSelectedLoadIdx(lastLoadIdx - 1);
  };

  const handleLoadSelect = (loadIdx) => {
    setSelectedLoadIdx(loadIdx);
    if (loadIdx !== -1) {
      setIsEditMode(false);
    }
  };

  const selectedLoad = loads[selectedLoadIdx];
  const hasUserLoads = loads.length !== 0;


  return (
    <>
      <Row>
        <Col>
          {hasUserLoads ? <h4>Here are your loads: </h4> :
              <h4>Looks like you don`t have any loads yet.
                You can create it below</h4>}
        </Col>
      </Row>
      {isLoadsLoaded && <Row>
        <Col md={4}>
          <LoadList
            loads={loads}
            onLoadSelect={handleLoadSelect}
            selectedLoadIdx={selectedLoadIdx}
            onSetIsEditMode={setIsEditMode}
          />

        </Col>
        <Col md={8}>
          {(isEditMode ?
              <EditLoadForm
                load={selectedLoad}
                setIsEditMode={setIsEditMode}
                onUpdateLoad={updateTrucks}
                onCreateLoad={createLoad}
              /> :
              <LoadDetails
                load={selectedLoad}
                setIsEditMode={setIsEditMode}
                onLoadDelete={removeLoad}
              />)
          }
        </Col>
      </Row>}
    </>
  );
};

export default LoadsPanel;
