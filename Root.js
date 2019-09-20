import React, { Component } from "react";
import { YellowBox } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Index from "./src/screens/Index";
import ViewStream from "./src/screens/ViewStream";
import PublishStream from "./src/screens/PublishStream";

YellowBox.ignoreWarnings(["Setting a timer", "Remote debugger"]);

const RootStack = createStackNavigator(
  {
    Index,
    ViewStream,
    PublishStream
  },
  {
    initialRouteName: "Index"
  }
);

const AppContainer = createAppContainer(RootStack);

class Router extends Component {
  render() {
    return <AppContainer />;
  }
}

export default Router;