import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TextInputComponent from "components/TextInputComponent";
import ButtonComponent from "components/ButtonComponent";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const SignUp = async () => {
    setIsLoading(true);
    axios
      .post(`${process.env.ENDPOINT}/auth/user/signup`, {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        const success = response.data.success;
        const message = response.data.message;
        if (success) {
          Alert.alert("Registered Sucessfully!", message);
          setIsLoading(false);
          navigate("Login");
        } else {
          console.log(message);
          setIsLoading(false);
          Alert.alert("Error", message);
        }
        // navigate('HomeStack')
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Error", "Username already taken");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Register</Text>
      <TextInputComponent
        value={name}
        onChange={setName}
        placeholder={"Enter name"}
        secureText={false}
      />
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
        onPress={() => navigate("Login")}
      >
        <Text style={styles.signInText}>
          Already have an account? Login here!
        </Text>
      </TouchableOpacity>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={"#abfc03"} size={30} />
          <Text style={styles.registerText}>Signing Up</Text>
        </View>
      ) : (
        <ButtonComponent buttonText={"Regiser"} onPress={SignUp} />
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
  },
  headText: {
    fontSize: 23,
    color: "black",
    textAlign: "center",
    marginBottom: "5%",
    fontFamily: "Sen-Bold",
  },
  signInText: {
    color: "black",
    marginTop: "2%",
    marginLeft: "5%",
    fontFamily: "Poppins",
  },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  registerText: {
    fontFamily: "Poppins",
    color: "black",
    marginLeft: 10,
  },
});
