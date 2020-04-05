import React, {Component} from 'react';
import TruckList from './TruckList/TruckList';
import {Col, Tab, Row} from 'react-bootstrap';
import TruckDetails from './TruckDetails/TruckDetails';
import EditTruckForm from './EditTruckForm/EditTruckForm';
import {getTrucks, putTruck} from '../../../api/trucksApi';

class TrucksPanel extends Component {
  constructor() {
    super();

    this.state = {
      trucks: [],
      selectedTruckIdx: 0,
      isEditMode: false,
    };

    this.fetchTrucks = this.fetchTrucks.bind(this);
    this.updateTrucks = this.updateTrucks.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setSelectedTruckIdx = this.setSelectedTruckIdx.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrucks();
  }

  async fetchTrucks() {
    const response = await getTrucks();
    this.setState({
      trucks: [...response.trucks],
    });
  };

  async updateTrucks(truckId, editedTruckData) {
    await putTruck(truckId, editedTruckData);
    await this.fetchTrucks();
  };

  setEditMode(newEditMode) {
    this.setState({isEditMode: newEditMode});
  }

  setSelectedTruckIdx(newSelectedTruckIdx) {
    this.setState({selectedTruckIdx: newSelectedTruckIdx});
  }


  render() {
    const {isEditMode, trucks, selectedTruckIdx} = this.state;
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
              onTruckSelect={this.setSelectedTruckIdx}
            />
          </Col>
          <Col md={8}>
            {isEditMode ?
              <EditTruckForm
                truck={selectedTruck}
                setEditMode={this.setEditMode}
                onUpdateTrucks={this.updateTrucks}
                truckIdx={selectedTruckIdx}
              /> :
              <TruckDetails
                truck={selectedTruck}
                truckIdx={selectedTruckIdx}
                setEditMode={this.setEditMode}
              />
            }
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default TrucksPanel;
