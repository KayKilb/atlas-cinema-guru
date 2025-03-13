import { useState } from "react";

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
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard = ({ movie, onWatchLaterToggle }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(movie.favorited);
  const [isWatchLater, setIsWatchLater] = useState(movie.watchLater);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        // Remove from favorites
        await fetch(`/api/favorites/${movie.id}`, { method: "DELETE" });
      } else {
        // Add to favorites
        await fetch(`/api/favorites/${movie.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleWatchLaterToggle = async () => {
    try {
      if (isWatchLater) {
        // Remove from watch later
        await fetch(`/api/watch-later/${movie.id}`, { method: "DELETE" });
      } else {
        // Add to watch later
        await fetch(`/api/watch-later/${movie.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: movie.id }),
        });
      }
      setIsWatchLater(!isWatchLater);
      onWatchLaterToggle(movie.id); // Notify parent component of the change
    } catch (error) {
      console.error("Failed to toggle watch later:", error);
    }
  };

  return (
    <div
      className="relative overflow-hidden transition-transform transform hover:scale-105 rounded-lg border-2 border-[#54F4D0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full aspect-square object-cover rounded-t-lg"
      />
      {isHovered && (
        <div className="absolute bottom-0 w-full bg-black bg-opacity-80 text-white p-3 transition-opacity">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          <p className="text-sm">{movie.synopsis}</p>
          <p className="text-xs">Released: {movie.released}</p>
          <p className="text-xs">Genre: {movie.genre}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleFavoriteToggle} className="text-yellow-400">
              {isFavorited ? "★" : "☆"}
            </button>
            <button onClick={handleWatchLaterToggle} className="text-blue-400">
              {isWatchLater ? "🕒" : "⏳"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
