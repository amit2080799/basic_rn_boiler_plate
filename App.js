import React from 'react';
import { BackHandler } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import BookingForm from './pages/BookingForm';

class App extends React.Component {
  UNSAFE_componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login" />
          <Scene initial key="signup" component={Signup} title="Signup" />
          <Scene key="bookingForm" component={BookingForm} title="Booking Form" />
        </Scene>
      </Router>
    );
  }
}

export default App;
