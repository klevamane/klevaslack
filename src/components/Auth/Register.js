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

class Register extends Component {
  state = {};

  // handleChange = (e) ={
  //     // console.log('welcome')
  // }
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="users" color="orange" />
            Register for KlevaChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="email"
                onChange={this.handleChange}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="password"
                onChange={this.handleChange}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfrimation"
                icon="repeat"
                iconPosition="left"
                placeholder="passwordConfrimation"
                onChange={this.handleChange}
                type="password"
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
