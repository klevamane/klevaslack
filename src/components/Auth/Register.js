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
      passwordConfirmation: '',
      errors: [],
      loading: false
  };


  isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
    // if we have a length of 0 for any of these input, we would return true
    // indicating that our form is not entirely filled up
      return !username.length || !email.length || !password.length || !passwordConfirmation;
  } 

  isPassowrdValid = ({ password, passwordConfirmation }) => {
      if(password.length < 6 || passwordConfirmation < 6 ) {
          return false;
      } else if(password !== passwordConfirmation) {
          return false;
      } else {
          return true;
      }

  }

  isFormValid = () => {
      let errors = [];
      let error;

      if(this.isFormEmpty(this.state)) {
          error = { message: 'Fill in all fields' };
          this.setState({ errors: errors.concat(error) })
          return false;
          // return false indicating that we shouldn't execute handle submit error
      } else if (!this.isPassowrdValid(this.state)) {
          error = { message: 'Password is invalid'};
          this.setState({ errors: errors.concat(error)})
          return false; 
      } else {
          // valid 
          return true;
      }
  }

  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = (event) => {
      event.preventDefault();
      if(this.isFormValid()) {
          this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            this.setState({ loading: false })
            console.log(createdUser);
        })
        .catch(err => {
            console.error(err);
            this.setState({ errors: this.state.errors.concat(err), loading: false });  
        })
    }
  }

  displayErrors = (errors) => errors.map((error, index) => <p key={index}>{error.message}</p>)

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error': ''
  }
  

  render() {
    //   the purpose of passing a the value of a given input back to the input is
    //   enable easy form clearance
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;
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
                className={this.handleInputError(errors, 'email')}
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
                className={this.handleInputError(errors, 'password')}
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="passwordConfrimation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
              />

              <Button  disabled={loading} className={loading ? "loading": ''} color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {/* if errors exist then show errors */}
          {errors.length > 0 && (
              <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
              </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
