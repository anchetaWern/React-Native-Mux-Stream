import React, { Component } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";
import Permissions from "react-native-permissions";
import axios from "axios";

import CommentList from "../components/CommentList";

export default class PublishStream extends Component {

  static navigationOptions = {
    header: null
  };

  state = {
    cameraPermission: 'undetermined',
    microphonePermission: 'undetermined',
    isPublishing: false,
    publishButtonText: 'Start Publishing',
    comments: []
  }


  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.stream_id = navigation.getParam("stream_id");
    this.mux_stream_key = navigation.getParam("mux_stream_key");
    this.mux_playback_id = navigation.getParam("mux_playback_id");
    this.stream_channel = navigation.getParam("stream_channel");
  }


  async componentDidMount() {
    const permission = await Permissions.checkMultiple(['camera', 'microphone']);

    let cameraPermission = permission.camera;
    let microphonePermission = permission.microphone;

    if (permission.camera == 'undetermined') {
      cameraPermission = await Permissions.request('camera');
      if (permission.microphone == 'undetermined') {
        microphonePermission = await Permissions.request('microphone');
      }
    }

    this.setState({ microphonePermission, cameraPermission });

    this.stream_channel.bind('client-viewer-comment', async (comment) => {
      await this.setState((prevState) => ({
        comments: prevState.comments.concat(comment)
      }));
    });
  }


  render() {
    const { cameraPermission, microphonePermission, publishButtonText, comments } = this.state;
    return (
      <View style={styles.container}>
        {
          cameraPermission == 'authorized' && microphonePermission == 'authorized' &&
          <View style={styles.wrapper}>
            <NodeCameraView
              style={styles.videoStream}
              ref={vb => {
                this.vb = vb;
              }}
              outputUrl={
                `rtmp://live.mux.com/app/${this.mux_stream_key}`
              }
              camera={{cameraId: 1, cameraFrontMirror: true}}
              audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
              video={{
                preset: 12,
                bitrate: 400000,
                profile: 1,
                fps: 15,
                videoFrontMirror: false,
              }}
              autopreview={true}
            />

            <CommentList comments={comments} />

            <View style={styles.buttonContainer}>
              <Button
                onPress={this._togglePublish}
                title={publishButtonText}
                color="#536f00"
              />
            </View>

          </View>
        }
      </View>
    );
  }


  _togglePublish = () => {
    if (this.state.isPublishing) {
      this.setState({ publishButtonText: 'Start Publishing', isPublishing: false });
      this.vb.stop();

      Alert.alert(
        'Stream finished!',
        'Thanks for using the app'
      );

      this.props.navigation.navigate('Index');

    } else {
      this.setState({ publishButtonText: 'Stop Publishing', isPublishing: true });
      this.vb.start();
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  videoStream: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});