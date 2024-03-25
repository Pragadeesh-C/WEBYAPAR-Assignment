import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DataViewComponet from "components/DataViewComponent";
import DataViewComponent from "components/DataViewComponent";
import Animated, { interpolate, useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const FetchPage = () => {
  const [Token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Token) {
      fetchData();
    }
  }, [Token]);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("Token");
      setToken(token);
    };
    getToken();
  }, []);

  const fetchData = async () => {
    const headers = {
      Authorization: Token,
      "Content-Type": "multipart/form-data",
    };
    await axios
      .get(`${process.env.ENDPOINT}/data`, {
        headers: headers,
      })
      .then((res) => {
        const data = res.data.data;
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);

      return dateB - dateA;
    });
  }, [data]);

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={"#abfc03"} size={40} />
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.headText}>Images Uploaded</Text>
          <Animated.FlatList
            data={sortedData}
            horizontal
            snapToInterval={width * 0.72}
            decelerationRate={0}
            bounces={false}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
              <DataViewComponent
                imageUrl={item.file}
                latitude={item.location.latitude}
                longitude={item.location.longitude}
              />
            )}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
};

export default FetchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontFamily: "Sen-Bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: "15%",
    color: "black",
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  loadingText: {
    fontFamily: "IntegralCF-Regular",
    color: "black",
    marginLeft: 10,
    fontSize: 23,
  },
  dataContainer: {
    width: width * 0.72,
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyling: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "center",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  locationHead: {
    fontFamily: "Sen-Bold",
    fontSize: 17,
    color: "black",
  },
  location: {
    fontFamily: "Sen",
    fontSize: 17,
    color: "black",
  },
});
