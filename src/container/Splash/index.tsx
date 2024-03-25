import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn();
    }, 1000);
  }, []);

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem("Token");
    if (token) {
      navigation.replace("HomeStack");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>WEBYAPAR</Text>
      <ActivityIndicator color={'#abfc03'} style={styles.loader} size={30}/>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontFamily: "Sen-Bold",
    fontSize: 25,
    color:'black'
  },
  loader:{
    marginTop:20
  }
});
