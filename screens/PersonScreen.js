import {
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-neutral-900"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Back button */}
        <SafeAreaView
          className={
            "z-20 w-full flex-row justify-between items-center px-4 " +
            verticalMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Person Details */}
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "gray",
              shadowOpacity: 1,
              shadowRadius: 40,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                style={{ height: height * 0.43, width: width * 0.74 }}
                source={require("../assets/images/castImage1.png")}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
                Alissa Skovbye
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
