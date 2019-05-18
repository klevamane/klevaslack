import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import { connect } from 'react-redux';
import firebase from '../../firebase';

class UserPanel extends Component {

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signed out'))
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Signout</span>
        }
    ]

    
  render() {
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>KlevaChat</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: "0.25em" }} as="h4">
            <Dropdown
              name="code"
              trigger={<span>User</span>}
              options={this.dropdownOptions()}
            />
            <Header.Content>KlevaChat</Header.Content>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, {})(UserPanel);
