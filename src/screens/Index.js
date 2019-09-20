import React, { Component } from "react";
import { View, Text, Button, Clipboard, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import axios from "axios";
import Config from "react-native-config";
import Pusher from "pusher-js/react-native";

const generateRandomAnimalName = require('random-animal-name-generator');

const SERVER_BASE_URL = 'YOUR NGROK HTTPS URL';

const mux_instance = axios.create({
  baseURL: 'https://api.mux.com',
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  auth: {
    username: Config.MUX_TOKEN_ID,
    password: Config.MUX_TOKEN_SECRET
  }
});

export default class Index extends Component {
  static navigationOptions = {
    header: null
  };


  state = {
    showStreamIDInputDialog: false,
    showStreamIDDialog: false,
    streamIDToView: "",
    generatedStreamID: generateRandomAnimalName().replace(' ', '-').toLocaleLowerCase() + '-' + Math.floor(Math.random() * 100)
  }


  componentDidMount() {
    this.pusher = new Pusher(Config.CHANNELS_KEY, {
      authEndpoint: `${SERVER_BASE_URL}/pusher/auth`,
      cluster: Config.CHANNELS_CLUSTER,
      encrypted: true
    });
  }


  render() {
    const { showStreamIDInputDialog, showStreamIDDialog, generatedStreamID } = this.state;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>What do you want to do?</Text>

        <View style={styles.buttonContainer}>
          <Button title="Publish Stream" color="#0064e1" onPress={() => this.setState({showStreamIDDialog: true})} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="View Stream" color="#6f42c1" onPress={() => this.setState({ showStreamIDInputDialog: true })} />
        </View>


        <Dialog.Container visible={showStreamIDInputDialog}>
          <Dialog.Title>Enter the Stream ID</Dialog.Title>
          <Dialog.Input label="Stream ID" placeholder="eg. XYZ-123" onChangeText={(text) => this.setState({ streamIDToView: text })}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => this.setState({ showStreamIDInputDialog: false })} />
          <Dialog.Button label="Go" onPress={this._goToView} />
        </Dialog.Container>

        <Dialog.Container visible={showStreamIDDialog}>
          <Dialog.Title>Here's your Stream ID</Dialog.Title>
          <Dialog.Description>
          {generatedStreamID}
          </Dialog.Description>

          <Dialog.Button label="Cancel" onPress={() => this.setState({ showStreamIDDialog: false })} />
          <Dialog.Button label="Copy and Go" onPress={this._goToPublish} />
        </Dialog.Container>

      </View>
    );
  }


  _goToPublish = async () => {
    const { generatedStreamID } = this.state;

    Clipboard.setString(generatedStreamID);

    this.setState({
      showStreamIDDialog: false
    });

    try {
      const mux_response = await mux_instance.post("/video/v1/live-streams", {
        "playback_policy": ["public"],
        "new_asset_settings": {
          "playback_policy": ["public"]
        }
      });

      const mux_stream_key = mux_response.data.data.stream_key;
      const mux_playback_id = mux_response.data.data.playback_ids[0].id;
      const server_response = await axios.post(`${SERVER_BASE_URL}/stream`, {
        id: generatedStreamID,
        mux_stream_key,
        mux_playback_id
      });

      this.stream_channel = this.pusher.subscribe(`private-stream-${generatedStreamID}`);

      this.props.navigation.navigate("PublishStream", {
        stream_id: generatedStreamID,
        mux_stream_key,
        mux_playback_id,
        stream_channel: this.stream_channel
      });

    } catch (err) {
      console.log("error creating new livestream: ", err);
    }
  }


  _goToView = async () => {
    const { streamIDToView } = this.state;

    this.setState({
      showStreamIDInputDialog: false
    });

    try {
      const { data } = await axios.get(`${SERVER_BASE_URL}/stream/${streamIDToView}`);
      this.stream_channel = this.pusher.subscribe(`private-stream-${streamIDToView}`);

      this.props.navigation.navigate("ViewStream", {
        stream_id: streamIDToView,
        mux_playback_id: data.playback_id,
        stream_channel: this.stream_channel
      });
    } catch (err) {
      console.log("error retrieving livestream: ", err);
    }
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  buttonContainer: {
    margin: 10
  }
});