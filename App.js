import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants } from "expo";

// You can import from local files

// or any pure javascript modules available in npm
import { Button, Card } from "react-native-elements"; // Version can be specified in package.json

import {
  createStackNavigator,
  NavigationActions,
  StackActions
} from "react-navigation";

import { startFlow } from "./flowIterator.js";
import questionIterator from "./questionIterator.js";
import questionState from "./questionState.js";
import { runStateMachine } from "./flowStateMachine.js";

const navigationParamsToReactProps = Comp => ({ navigation, ...rest }) => (
  <Comp {...navigation.state.params || {}} navigation={navigation} {...rest} />
);

const Home = navigationParamsToReactProps(({ navigation, finishParams }) => (
  <View style={styles.container}>
    {finishParams && (
      <Card title="Result">
        <Text>{JSON.stringify(finishParams, null, 2)}</Text>
      </Card>
    )}
    <View>
      <Button
        onPress={() => {
          // runStateMachine(navigation, questionState, undefined, finishParams => {
          //   navigation.push("FinishScreen", { finishParams });
          // });
          startFlow(navigation, questionIterator, {}, finishParams => {
            navigation.navigate("HomeScreen", { finishParams });
          });
        }}
        title="Start"
      />
    </View>
  </View>
));

const ContinueSkipScreen = navigationParamsToReactProps(
  ({ onNext, screenText, color }) => (
    <View style={styles.container}>
      <Card title="Continue/Skip screen">
        <Text style={styles.paragraph}>{screenText}</Text>
        <Button
          onPress={() => {
            onNext({ continue: true });
          }}
          backgroundColor={color}
          color="white"
          title="Continue"
        />
        <Button
          onPress={() => {
            onNext({ continue: false });
          }}
          title="Skip"
        />
      </Card>
    </View>
  )
);

const YesNoScreen = navigationParamsToReactProps(
  ({ onNext, screenText, color }) => (
    <View style={styles.container}>
      <Card title="Yes/No screen">
        <Text style={styles.paragraph}>{screenText}</Text>
        <Button
          onPress={() => {
            onNext({ value: true });
          }}
          backgroundColor={color}
          title="Yes"
        />
        <Button
          onPress={() => {
            onNext({ value: false });
          }}
          title="No"
        />
      </Card>
    </View>
  )
);

const CancelScreen = navigationParamsToReactProps(
  ({ onNext, screenText, color }) => (
    <View style={styles.container}>
      <Card title="Cancel screen">
        <Text style={styles.paragraph}>{screenText}</Text>
        <Button
          onPress={() => {
            onNext({ cancel: false });
          }}
          backgroundColor={color}
          color="white"
          title="Continue"
        />
        <Button
          onPress={() => {
            onNext({ cancel: true });
          }}
          backgroundColor="red"
          color="white"
          title="Cancel"
        />
      </Card>
    </View>
  )
);

const FinishScreen = navigationParamsToReactProps(({ finishParams }) => (
  <View style={styles.container}>
    <Card title="Finished">
      <Text>{JSON.stringify(finishParams, null, 2)}</Text>
    </Card>
  </View>
));

export default createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: `Home screen Profile`
    })
  },
  ContinueSkipScreen: {
    screen: ContinueSkipScreen
  },
  YesNoScreen: {
    screen: YesNoScreen
  },
  CancelScreen: {
    screen: CancelScreen
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
