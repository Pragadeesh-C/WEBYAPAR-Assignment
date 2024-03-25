import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const DataViewComponent = memo(({ imageUrl, longitude, latitude }) => {
  return (
    <View style={styles.dataContainer}>
      <Animated.View style={styles.containerStyling}>
        <Image
          source={{ uri: `${process.env.ENDPOINT}/${imageUrl}` }}
          style={styles.image}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 30,
          }}
        >
          <View>
            <Text style={styles.locationHead}>Latitude</Text>
            <Text style={styles.location}>{latitude}</Text>
          </View>
          <View>
            <Text style={styles.locationHead}>Longitude</Text>
            <Text style={styles.location}>{longitude}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
});

export default DataViewComponent;

const styles = StyleSheet.create({
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
