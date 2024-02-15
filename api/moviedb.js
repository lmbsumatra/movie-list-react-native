import axios from "axios";
import { apikey } from "../constants";

// endpoints

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apikey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apikey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apikey}`;

// dynamic endpoints

const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apikey}`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apikey}`;

const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apikey}`;

const personDetailsEndpoint = (person_id) =>
  `${apiBaseUrl}/person/${person_id}?api_key=${apikey}
  `;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apikey}`;
  const searchMoviesEndpoint = `${apiBaseUrl}/search/movie`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallBackMoviePoster = "../assets/images/moviePoster.svg";
export const fallBackPersonImage =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

const apicall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};
export const fetchTrendingMovies = () => {
  return apicall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apicall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apicall(topRatedMoviesEndpoint);
};
export const fetchMovieDetails = (id) => {
  return apicall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apicall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apicall(similarMoviesEndpoint(id));
};
export const fetchPersonDetails = async (id) => {
  return apicall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apicall(personMoviesEndpoint(id));
};
export const searchMovies = (params) => {
  const endpoint = `${searchMoviesEndpoint}?api_key=${apikey}`;
  return apicall(endpoint, params);
};
