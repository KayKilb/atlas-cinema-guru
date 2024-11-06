// app/ui/components/MovieCard.tsx

import { useState } from "react";
import {
  insertFavorite,
  deleteFavorite,
  insertWatchLater,
  deleteWatchLater,
} from "@/lib/data";

export default function MovieCard({ movie }) {
  const [isFavorited, setIsFavorited] = useState(movie.favorited);
  const [isWatchLater, setIsWatchLater] = useState(movie.watchLater);

  const toggleFavorite = async () => {
    if (isFavorited) {
      await deleteFavorite(movie.id);
    } else {
      await insertFavorite(movie.id);
    }
    setIsFavorited(!isFavorited);
  };

  const toggleWatchLater = async () => {
    if (isWatchLater) {
      await deleteWatchLater(movie.id);
    } else {
      await insertWatchLater(movie.id);
    }
    setIsWatchLater(!isWatchLater);
  };

  return (
    <div className="relative border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-2">
        <h2 className="text-lg font-bold">{movie.title}</h2>
        <p>{movie.synopsis}</p>
        <div className="flex items-center mt-2">
          <button onClick={toggleFavorite} className="mr-4">
            {isFavorited ? "★" : "☆"}
          </button>
          <button onClick={toggleWatchLater}>
            {isWatchLater ? "🕒" : "⏲"}
          </button>
        </div>
      </div>
    </div>
  );
}
