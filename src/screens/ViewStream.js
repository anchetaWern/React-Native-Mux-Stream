import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ViewStream extends Component {

  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>ViewStream Screen</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
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
    top: 20,
    right: 20
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 40,
    backgroundColor: '#FFF'
  },
  typeText: {
    color: '#FFF'
  }
});