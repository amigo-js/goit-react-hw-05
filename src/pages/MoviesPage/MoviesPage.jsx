import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { searchMovies } from "../../fetch";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        setNoResults(false);
        const moviesData = await searchMovies(query);

        if (moviesData.length === 0) {
          setNoResults(true);
        } else {
          setMovies(moviesData);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
    setMovies([]);
  };

  return (
    <main className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message="An error occurred during the search." />}
      {noResults && !loading && !error && (
        <p className={css.noResults}>Sorry, no movies found for your search.</p>
      )}
      {movies.length > 0 && !loading && !error && <MovieList movies={movies} />}
    </main>
  );
}
