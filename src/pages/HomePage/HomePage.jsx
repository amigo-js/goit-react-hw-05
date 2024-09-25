import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchTrendingMovies } from "../../fetch";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <main className={css.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
}
