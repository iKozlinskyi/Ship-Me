import React, {Component} from 'react';
import {getCurrentUser} from '../../api/userApi';
import {getTrucks} from '../../api/trucksApi';
import TrucksPanel from './TrucksPanel/TrucksPanel';

class DriverPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      trucks: [],
    };
  }

  async componentDidMount() {
    const currentUser = await getCurrentUser();
    const userTrucks = await getTrucks();

    this.setState({currentUser, trucks: userTrucks.trucks});
  }


  render() {
    const {currentUser, trucks} = this.state;

    return (
      <div>
        <h3>Hello, {currentUser.username}</h3>
        <h4>Here are your trucks: </h4>
        <TrucksPanel trucks={trucks}/>
      </div>
    );
  }
}

export default DriverPage;
