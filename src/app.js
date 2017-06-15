import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYJP96TMNtf5YuEgIlg94vnNhumi7VB9Y',
      authDomain: 'authdemo-b0a9b.firebaseapp.com',
      databaseURL: 'https://authdemo-b0a9b.firebaseio.com',
      projectId: 'authdemo-b0a9b',
      storageBucket: 'authdemo-b0a9b.appspot.com',
      messagingSenderId: '378830739987'
    });
  }

  render() {
    return (
      <View>
        <Header>Authentication</Header>
        <LoginForm />
      </View>
    );
  }
}

export default App;
