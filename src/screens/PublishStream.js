import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class PublishStream extends Component {

  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>PublishStream Screen</Text>
      </View>
    );
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