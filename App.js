import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import Root from "./Root";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Root />
    </SafeAreaView>
  );
};

//

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;