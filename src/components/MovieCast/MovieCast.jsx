import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovieCast } from "../../fetch";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieCast = await fetchMovieCast(movieId);
        setCast(movieCast);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <ul className={css.container}>
      {cast.map((actor) => {
        const profileImageUrl = actor.profile_path
          ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
          : "https://via.placeholder.com/200x300?text=No+Image";

        return (
          <li key={actor.id} className={css.item}>
            <img
              src={profileImageUrl}
              alt={actor.name}
              className={css.profileImage}
            />
            <p>
              <strong>{actor.name}</strong>
            </p>
            <p>as {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
