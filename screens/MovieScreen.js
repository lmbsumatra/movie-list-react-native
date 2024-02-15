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
import Loading from "../components/loading";
import { fetchMovieDetails, image500, fetchMovieCredits, fetchSimilarMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  let movieName = "Firefly Lane";

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("data", data);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("data", data);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("data", data.results);
    if (data && data.results) setSimilarMovies(data.results);
  };

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
          {loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={
                  { uri: image500(movie?.poster_path) } || fallBackMoviePoster
                }
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.6)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          )}
        </View>
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>

          {/* Status, Release, Runtime */}

          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
              {movie?.runtime} min
            </Text>
          ) : null}

          {/* Genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {genre?.name} {showDot ? "•" : null}
                </Text>
              );
            })}
          </View>

          {/* Movie Description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
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
