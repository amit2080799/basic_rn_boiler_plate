import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Input, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { sha512 } from 'react-native-sha512';
import { Actions } from 'react-native-router-flux';

import Endpoints from '../Endpoints';
import WebService from '../WebService';
import Login from './Login';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      hasError: false,
      errorText: ''
    };
  }

  signup() {
    if(this.state.email===""||this.state.name===""||this.state.password===""||this.state.confirmPassword==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
      return;
    }
    if(this.state.password !== this.state.confirmPassword) {
      this.setState({hasError: true, errorText: 'Passwords does not match !'});
      return;
    }
    this.setState({hasError: false});
    this.sendDataToServer();
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  sendDataToServer = async() => {
    let state = this.state;
    let fieldName = 'customer';
    let queryParams = {
       name: state.name,
       email: state.email,
       password: state.password,
       type: fieldName
     }
     let endpoint = Endpoints.users;
     let body = JSON.stringify(queryParams);
     let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
     let result = await new WebService()._post_data(endpoint, headers, body);
     new Login().login(JSON.parse(result.user).email, state.password);
  }

  render() {
    return (
      <Container>
        <View style={styles.dummyWrapper}>
        </View>
        <Content contentContainerStyle={styles.cardContent}>
          <Card>
            <CardItem>
              <Body>
              <Input placeholder="Name" onChangeText={(text) => this.setState({name: text})} />
              <Input placeholder="Email" onChangeText={(text) => this.setState({email: text})} />
              <Input placeholder="Password" onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} />
              <Input placeholder="Confirm Password" onChangeText={(text) => this.setState({confirmPassword: text})} secureTextEntry={true} />
              </Body>
            </CardItem>
            <CardItem style={styles.buttonWrapper}>
                <Button primary onPress={() => this.signup(this.state.email, this.state.password, this.state.name)}>
                  <Text> Signup </Text>
                </Button>
            </CardItem>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          </Card>
          <Button transparent onPress={() => Actions.login()}>
            <Text> Already Registered? Login </Text>
          </Button>
        </Content>
        <StatusBar style='auto' />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  dummyWrapper: {
    marginTop: window_height * 0.2
  },
  cardContent: {
    marginLeft: window_width * 0.05,
    marginRight: window_width * 0.05
  },
  buttonWrapper: {
    justifyContent: 'center'
  }
});

export default Signup;
