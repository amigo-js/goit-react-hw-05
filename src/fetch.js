import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTBmNzFkMmMxNmI3MWU4OTZlODMyYTZlZDdhYmEzMyIsIm5iZiI6MTcyNzEyNTMzOS43NTI3MTgsInN1YiI6IjY2ZjFkNTYwNTgzYzU2Y2RiMTI2MzFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wigp9AlQRrLhg9WK8HTMoJOOG4ljVC--pJUHMUqWt3A",
  },
});

export async function fetchTrendingMovies() {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await instance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
}
