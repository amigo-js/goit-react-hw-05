import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovieReviews } from "../../fetch";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <ul className={css.container}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ul>
  );
}
