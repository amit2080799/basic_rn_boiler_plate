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

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

class BookingForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
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
              <Input placeholder="BookingForm" />
              </Body>
            </CardItem>
            <CardItem style={styles.buttonWrapper}>
                <Button primary onPress={() => this.signup(this.state.email, this.state.password, this.state.name)}>
                  <Text> Signup </Text>
                </Button>
            </CardItem>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          </Card>
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

export default BookingForm;
