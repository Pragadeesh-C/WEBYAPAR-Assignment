import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../../container/Splash";
import SignIn from "../../container/SignIn";
import Register from "../../container/Register";
import TabNavigator from "../TabNavigator";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        animationEnabled:true,
        animationTypeForReplace:'push'
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeStack" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
