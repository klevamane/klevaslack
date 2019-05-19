import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from 'react-redux';

import firebase from '../../firebase';

//Actions
import { setCurrentChannel } from '../../actions';

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoad: true,
    activeChannel: ''
  };

  componentDidMount() {
      this.addListeners();
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if(this.state.firstLoad && this.state.channels.length > 0) {
        // set the first channel as active upon first visit
        this.props.setCurrentChannel(firstChannel)
        this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  }

  addListeners = () => {
      let loadedChannels = [];
      this.state.channelsRef.on('child_added', snap => {
          loadedChannels.push(snap.val());
          this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
      })
  }

  addChannel = () => {
      const { channelsRef, channelDetails, channelName, user } = this.state;
      const key = channelsRef.push().key // should provide a unique id for evey new channel added
    
    //   we are creating the channel exactly how we want it to indent in the database
      const newChannel = {
          id: key,
          name: channelName,
          details: channelDetails,
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

  setActiveChannel = (channel) => {
      this.setState({ activeChannel: channel.id });
  }

  changeChannel = (channel) => {
    this.props.setCurrentChannel(channel)
    // set the currently active channel highlight
    this.setActiveChannel(channel);
}

//   Note that we used parenthesis here because of implicit return
  displayChannels = (channels) => (
      channels.length > 0 && channels.map(channel => (
          <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
          >
           # {channel.name}   
          </Menu.Item>
      ))
  );

 

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
          {this.displayChannels(channels)}
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
const mapStateToProps = state => ({
    currentChannel: state.channel
})

export default connect(mapStateToProps, { setCurrentChannel })(Channels);
