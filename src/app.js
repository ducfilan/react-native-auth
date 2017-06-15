import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { isLoggedIn: undefined, user: undefined }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYJP96TMNtf5YuEgIlg94vnNhumi7VB9Y',
      authDomain: 'authdemo-b0a9b.firebaseapp.com',
      databaseURL: 'https://authdemo-b0a9b.firebaseio.com',
      projectId: 'authdemo-b0a9b',
      storageBucket: 'authdemo-b0a9b.appspot.com',
      messagingSenderId: '378830739987'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         this.setState({ isLoggedIn: true, user });
      } else {
        this.setState({ isLoggedIn: true });
      }
    });
  }

  renderContent() {
    switch (this.state.isLoggedIn) {
      case true:
        return (
          <Card>
            <Text style={styles.welcomeMessageStyle}>
              Welcome {this.state.user.email}
            </Text>
            <CardSection>
              <Button>Log out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerWrapperStyle}>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>Authentication</Header>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  welcomeMessageStyle: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20
  },
  spinnerWrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default App;
