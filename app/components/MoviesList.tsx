// app/components/MovieCard.tsx
import React from "react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    released: number;
    genre: string;
    favorited: boolean;
    watchLater: boolean;
    image: string;
  };
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onFavoriteToggle,
  onWatchLaterToggle,
}) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.synopsis}</p>
        <p>{movie.released}</p>
        <button onClick={() => onFavoriteToggle(movie.id)}>
          {movie.favorited ? "★" : "☆"}
        </button>
        <button onClick={() => onWatchLaterToggle(movie.id)}>
          {movie.watchLater ? "⏰" : "⏲"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
