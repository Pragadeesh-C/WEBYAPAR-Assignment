import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TextInputComponent from "../../components/TextInputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  console.log(process.env.ENDPOINT)

  const Login = async () => {
    setIsLoading(true);
    await axios
      .post(`${process.env.ENDPOINT}/auth/user/login`, {
        email,
        password,
      })
      .then(async (res) => {
        console.log(res.data);
        const response = res.data;
        const success = response.success;
        const message = response.message;
        if (success) {
          const token = response.token;
          await AsyncStorage.setItem("Token", token);
          Alert.alert("Success", "Logged In Successfully!");
          navigation.replace("HomeStack");
        } else {
          Alert.alert("Error", message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("Error", "Email or password incorrect");
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Login</Text>
      <TextInputComponent
        value={email}
        onChange={setEmail}
        placeholder={"Enter email"}
        secureText={false}
      />
      <TextInputComponent
        value={password}
        onChange={setPassword}
        placeholder={"Enter password"}
        secureText={true}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigate("Register")}
      >
        <Text style={styles.signUpText}>
          Don't have an account? Register here!
        </Text>
      </TouchableOpacity>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={'#abfc03'} size={30} />
          <Text style={styles.loginText}>Logging In</Text>
        </View>
      ) : (
        <ButtonComponent buttonText={"Login"} onPress={Login} />
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    justifyContent:'center',
  },
  headText: {
    fontSize: 23,
    textAlign: "center",
    color: "black",
    fontFamily: "Sen-Bold",
  },
  registerButton: {},
  signUpText: {
    color: "black",
    marginTop: "2%",
    marginLeft: "5%",
    fontFamily: "Poppins",
  },
  loader: {
    marginTop: 10,
  },
  loginText: {
    fontFamily: "Poppins",
    color: "black",
    marginLeft: 10,
  },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
});
