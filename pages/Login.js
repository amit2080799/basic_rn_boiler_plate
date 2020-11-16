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
import Base64 from '../Base64';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    hasError: false,
    errorText: ''
  };

  async login(email, password) {
    let endpoint = Endpoints.authenticate;
    let response;
    let auhtorizationData = new Base64().btoa(decodeURIComponent(`${email}:${password}`));
    var fieldName = 'customer';
    let headers = {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `Basic ${auhtorizationData}`
     }

    let body = JSON.stringify({email: email, password: password});
    response = await new WebService()._post_data(endpoint, headers, body);

    if(response.auth_token) {
      await AsyncStorage.setItem("authToken", response.auth_token);
      await AsyncStorage.setItem('customer_user_email', email);
      await AsyncStorage.setItem('is_user_logged_in', "true");
      await AsyncStorage.setItem('typeFieldName', fieldName);
      // Actions.home({fieldName: fieldName});
      this.setState({hasError: true, errorText: 'Success!'});
    } else {
      this.setState({hasError: true, errorText: 'Invalid email or password!'});
    }
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
              <Input placeholder="Email" onChangeText={(text) => this.setState({email: text})} />
              <Input placeholder="Password" onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} />
              </Body>
            </CardItem>
            <CardItem style={styles.buttonWrapper}>
                <Button primary onPress={() => this.login(this.state.email, this.state.password)}>
                  <Text> Login </Text>
                </Button>
            </CardItem>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          </Card>
          <Button transparent>
            <Text> Register </Text>
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

export default Login;
