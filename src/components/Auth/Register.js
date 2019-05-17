import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Button,
  Header,
  Message,
  Icon,
  Segment
} from "semantic-ui-react";

import firebase from '../../firebase';

class Register extends Component {
  state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
  };

  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = (event) => {
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser);
        })
        .catch(err => {
            console.error(err);
        })
        
  }

  render() {
    //   the purpose of passing a the value of a given input back to the input is
    //   enable easy form clearance
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="users" color="orange" />
            Register for KlevaChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="email"
                onChange={this.handleChange}
                type="email"
                value={email}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="password"
                onChange={this.handleChange}
                type="password"
                password={password}
              />

              <Form.Input
                fluid
                name="passwordConfrimation"
                icon="repeat"
                iconPosition="left"
                placeholder="passwordConfrimation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />

              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
