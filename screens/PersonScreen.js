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
import MovieList from "../components/movieList";
import Loading from "../components/loading";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState();
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

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
        {loading ? (
          <Loading />
        ) : (
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
              <Text className="text-base text-neutral-500 text-center">
                London, United States
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">Acting</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">
                  February 04, 2002
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">50.45%</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                Born in Vancouver, Canada, Ali began her acting career at only
                four years old after being scouted for a national car
                commercial. She went directly into film and television the
                following year, booking a supporting lead role in the feature
                film "Personal Effects" starring Michelle Pfeiffer and Academy
                Award winning actress Kathy Bates. A string of guest starring
                roles in television series followed, including Supernatural(CW),
                Fringe(FOX), Smallville (CW), Motive (CTV), as well as booking
                recurring roles on Once Upon a Time (ABC), Falling Skies (TNT),
                The Man in the High Castle (Amazon), You, Me, Her (Audience),
                and When Calls the Heart (Hallmark). She was just 11 years old
                when she booked her first lead in the movie, "One Christmas Eve"
                for Hallmark Hall of Fame. The film was directed by Jay Russell
                and starred Anne Heche, who mentored her throughout the six week
                shoot. Ali was subsequently nominated for a Young Artist Award
                for her work in the film. Ali followed this by booking another
                lead role in the Hallmark movie Campfire Kiss opposite Danica
                McKellar.She won a Joey award for best leading actress for her
                portrayal of Lacey Reynolds.
              </Text>
            </View>

            {/* Movie list for this person */}
            <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
