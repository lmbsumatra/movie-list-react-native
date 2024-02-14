import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

  let movieName = "Firefly Lane";

  useEffect(() => {}, [item]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        <View className="w-full">
          <SafeAreaView
            className={
              "absolute z-20 w-full flex-row justify-between items-center px-4 " +
              topMargin
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
              <HeartIcon
                size="35"
                color={isFavourite ? theme.background : "white"}
              />
            </TouchableOpacity>
          </SafeAreaView>

          <View>
            <Image
              source={require("../assets/images/moviePoster1.png")}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.6)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movieName}
          </Text>

          {/* Status, Release, Runtime */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Release * 2020 * 170 min
          </Text>

          {/* Genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Action *
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Thrill *
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy
            </Text>
          </View>

          {/* Movie Description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            Firefly Lane follows the friendship and bond between two women from
            the Seattle area, Kate Mularkey and Tallulah "Tully" Hart, from when
            they become neighbors at age 14 on a street named Firefly Lane,
            through the decades until their 40s, through the ups and downs of
            their lives.
          </Text>
        </View>

        {/* Casts */}
        <Cast cast={cast} navigation={navigation} />

        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
