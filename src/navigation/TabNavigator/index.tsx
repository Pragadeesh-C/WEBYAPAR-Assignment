import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Upload from "../../container/Upload";
import FetchPage from "../../container/FetchPage";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const TabNavigator = () => {
  const Tab = AnimatedTabBarNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#222222",
        activeBackgroundColor:'#abfc03',
        labelStyle:{fontFamily:'Sen-Bold',fontSize:15}
      }}
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#a565ff" }}
      appearance={{floating:true}}

    >
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fetch"
        component={FetchPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
