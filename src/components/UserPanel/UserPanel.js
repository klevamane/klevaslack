import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from 'react-redux';
import firebase from '../../firebase';

class UserPanel extends Component {
    state = {
        user: this.props.currentUser
    }

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signed out'))
    }

    dropdownOptions = () => [
        {
            key: 'user',
            // ensure the current user object is updated before it is being accessed for the displayName 
            // by this.state.currentUser && 
            // note that we need not do this because we are now passing our props from the parent App.js component
            // which means that the user will always be loaded with displayName, but we would let it be.
            text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
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
      const { user } = this.state;
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>KlevaChat</Header.Content>
            </Header>

            {/* User dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4">
            <Dropdown
              name="code"
              trigger={
              <span>
                <Image src={user.photoURL} spaced="right" avatar/>
                {user.displayName}
                </span>}
              options={this.dropdownOptions()}
            />
            <Header.Content>KlevaChat</Header.Content>
          </Header>
          {/* End of dropdown */}
          </Grid.Row>

        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, {})(UserPanel);
