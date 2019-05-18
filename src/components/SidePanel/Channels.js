import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import firebase from '../../firebase';

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref('channels'),
    modal: false
  };

  addChannel = () => {
      const { channelsRef, channelDetails, channelName, user } = this.state;
      const key = channelsRef.push().key // should provide a unique id for evey new channel added
    
    //   we are creating the channel exactly how we want it to indent in the database
      const newChannel = {
          id: key,
          name: channelName,
          Details: channelDetails,
          createdBy: {
            name: user.displayName,
            avatar: user.photoURL
          }

      };
      channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({ channelDetails: '', channelName: '' });
            this.closeModal();
            //TODO: We can implement 
            console.log('channel added');
        })
        .catch((err) => {
            console.error(err);
        })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeModal = () => this.setState({ modal: false });
  openModal = () => this.setState({ modal: true });

  isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;
  handleSubmit = (event) => {
      event.preventDefault();
      if (this.isFormValid(this.state)) {
          this.addChannel()
      }
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS{" "}
            </span>
            ({channels.length})<Icon name="add" onClick={this.openModal} />
          </Menu.Item>
        </Menu.Menu>
        {/* Add channel modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  name="channelName"
                  label="Name of Channel"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  name="channelDetails"
                  label="Details about the channel"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark"/> Add
            </Button>

            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
