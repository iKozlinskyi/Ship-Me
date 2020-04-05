import React, {Component} from 'react';
import {getCurrentUser} from '../../api/userApi';
import TrucksPanel from './TrucksPanel/TrucksPanel';

class DriverPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
    };
  }

  async componentDidMount() {
    const currentUser = await getCurrentUser();
    this.setState({currentUser});
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
