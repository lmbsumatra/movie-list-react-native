import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "../theme";

const { width, height } = Dimensions.get("window");

export default function MovieList({ title, data }) {
  let movieName = "Firefly Lane";
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => NavigationPreloadManager.navigate("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require("../assets/images/moviePoster1.png")}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
              </View>
              <Text className="text-neutral-300 ml-1">{movieName.length>14 ? movieName.slice(0,14)+'...' : movieName}</Text>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
