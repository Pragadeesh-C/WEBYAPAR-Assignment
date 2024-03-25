import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TextInputComponent = ({ value, onChange, placeholder, secureText }) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.textInput}
        placeholder={`${placeholder}`}
        secureTextEntry={secureText}
        placeholderTextColor={"black"}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 6,
    alignSelf: "center",
    marginTop: "5%",
    padding: 10,
    color: "black",
    fontFamily:'Poppins'
  },
});
