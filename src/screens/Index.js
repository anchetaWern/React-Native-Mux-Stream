import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Index extends Component {
  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Index Screen</Text>
      </View>
    );
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