import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputComponent from "components/TextInputComponent";

const Upload = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setSelectedImage] = useState("");
  const [Token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("Token");
      setToken(token);
    };
    getToken();
    getLocation();
  }, []);

  const handleButtonPress = () => {
    setIsLoading(true);
    if (count == 0) {
      setIsLoading(false);
      Alert.alert("Image not Selected!", "Select an Image first!");
    }
    if (image) {
      handleSendImage();
    } else {
      setTimeout(() => {
        handleButtonPress;
      }, 2000);
    }
  };

  const handleCameraLaunch = () => {
    setCount(count + 1);
    console.log("asdasds");
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    console.log("CAM");
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log("URL", image);
      }
    });
  };

  const handleImagePicker = async () => {
    setCount(count + 1);
    await launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("ImagePicker response:", response.assets[0]); // Add this line for debugging
      setSelectedImage(response.assets[0].uri);
    });
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (resp) => {
        setLatitude(resp.coords.latitude);
        setLongitude(resp.coords.longitude);
        console.log(latitude, longitude);
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSendImage = async () => {
    console.log("image", latitude, longitude, image);
    const formData = new FormData();
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("file", {
      uri: image,
      name: "image.jpg",
      type: "image/jpg",
    });

    console.log(image, latitude, longitude);

    const headers = {
      Authorization: Token,
      "Content-Type": "multipart/form-data",
    };

    setTimeout(() => postFormData(), 3000);

    const postFormData = async () => {
      try {
        const url = "https://test.webyaparsolutions.com/form";
        await axios
          .post(`${process.env.ENDPOINT}/form`, formData, { headers: headers })
          .then((response) => {
            const res = response.data;
            const success = res.success;
            const message = res.message;
            if (success) {
              setIsLoading(false);
              Alert.alert("Success!", "Image Uploaded Successfully");
              setSelectedImage("");
            } else {
              setIsLoading(false);

              Alert.alert("Error", message);
            }
          });
      } catch (error) {
        setIsLoading(false);
        console.error("Error occurred:", error);
      }
    };
  };

  const Box = ({ ImageUrl, BoxText, onPress }) => {
    return (
      <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
        <Image source={ImageUrl} style={styles.boximg} />
        <Text
          style={{
            color: "black",
            fontFamily: "Poppins",
            marginTop: 5,
            fontSize: 15,
            marginLeft: "2%",
          }}
        >
          {BoxText}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    // <ScrollView style={{flex:1,backgroundColor:'#f6f6f6'}}>
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload</Text>
      <View style={styles.locationView}>
        <Text style={styles.locationHeadText}>Latitude</Text>
        <TextInputComponent
          placeholder={latitude}
          value={latitude}
          onChange={setLatitude}
        />
      </View>
      <View style={styles.locationView}>
        <Text style={styles.locationHeadText}>Longitude</Text>
        <TextInputComponent
          placeholder={longitude}
          value={longitude}
          onChange={setLongitude}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Box
          ImageUrl={require("../../images/photo.png")}
          BoxText={"Open Camera"}
          onPress={handleCameraLaunch}
        />
        <Box
          ImageUrl={require("../../images/gallery.png")}
          BoxText={"From Gallery"}
          onPress={handleImagePicker}
        />
      </View>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : <></>}
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={"#abfc03"} size={30} />
          <Text style={styles.uploadText}>Uploading</Text>
        </View>
      ) : (
        <ButtonComponent
          style={{ marginBottom: "20%", width: "100%" }}
          buttonText={"Upload"}
          onPress={handleButtonPress}
        />
      )}
    </View>
    // </ScrollView>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Sen-Bold",
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginBottom: 15,
    marginTop: "5%",
  },
  locationHeadText: {
    color: "black",
    fontFamily: "Sen",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 7,
  },
  locationText: {
    color: "black",
    fontFamily: "Poppins",
    fontSize: 17,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  locationView: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  boximg: {
    height: 32,
    width: 32,
  },
  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: "10%",
    flexDirection: "row",
  },
  uploadText: {
    fontFamily: "Poppins",
    color: "black",
    marginLeft: 10,
  },
});
