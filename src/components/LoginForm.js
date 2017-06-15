import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication failed!',
      loading: false }
    );
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPressHandler={this.onButtonPress.bind(this)}>Login</Button>
    );
  }

	render() {
		return (
			<Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='your_email@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
            <Input
              secureTextEntry
              label='Password'
              placeholder='********'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
        </CardSection>

        <Text style={styles.errorText}>
          {this.state.error }
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
		);
	}
}

const styles = {
  errorText: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
};

export default LoginForm;
