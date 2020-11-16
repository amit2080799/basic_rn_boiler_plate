import React from 'react';
import { BackHandler } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Login from './pages/Login';

class App extends React.Component {
  UNSAFE_componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene initial key="login" component={Login} title="Login" />
        </Scene>
      </Router>
    );
  }
}

export default App;
