import {
  useParams,
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchMovieDetails } from "../../fetch";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!movie) return null;

  const handleBack = () => {
    const previousPage = location.state?.from ?? "/movies";
    navigate(previousPage);
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const userScore = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : "N/A";

  return (
    <div className={css.details}>
      <button onClick={handleBack} className={css.button}>
        Go back
      </button>

      <div className={css.description}>
        <img src={imageUrl} alt={movie.title} className={css.poster} />

        <div className={css.info}>
          <h1>
            {movie.title} ({releaseYear})
          </h1>
          <p>
            <strong>User Score:</strong> {userScore}%
          </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres?.map((genre) => genre.name).join(", ") ||
              "No genres available"}
          </p>
        </div>
      </div>

      <div className={css.addInfo}>
        <h3>Additional Information</h3>
        <nav className={css.nav}>
          <NavLink to="cast" state={location.state}>
            Cast
          </NavLink>{" "}
          <NavLink to="reviews" state={location.state}>
            Reviews
          </NavLink>
        </nav>
      </div>

      {/* Здесь Outlet для рендера Cast и Reviews */}
      <Outlet />
    </div>
  );
}
