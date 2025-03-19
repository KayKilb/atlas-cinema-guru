// components/MovieCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
}

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onFavoriteToggle,
  onWatchLaterToggle,
}) => {
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
      onFavoriteToggle(movie.id);
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
      onWatchLaterToggle(movie.id);
    } catch (error) {
      console.error("Failed to toggle watch later:", error);
    }
  };

  return (
    <div
      className="group relative bg-[#54F4D0] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
      style={{ width: "250px" }} // Adjust width to your preference
    >
      {/* Top-right icons on hover */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={handleFavoriteToggle} className="focus:outline-none">
          <Image
            src={
              isFavorited ? "/assets/starfull.svg" : "/assets/staroutline.svg"
            }
            alt="Favorite Icon"
            width={24}
            height={24}
          />
        </button>
        <button onClick={handleWatchLaterToggle} className="focus:outline-none">
          <Image
            src={
              isWatchLater
                ? "/assets/clockfull.svg"
                : "/assets/clockoutline.svg"
            }
            alt="Watch Later Icon"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Movie Poster Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Bottom overlay appears on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#080464] text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform"
        style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
      >
        <h3 className="text-md font-semibold mb-1">
          {movie.title} ({movie.released})
        </h3>
        <p className="text-sm mb-2">{movie.synopsis}</p>

        {/* Genre Pill */}
        <div className="inline-block bg-[#54F4D0] text-[#00003c] px-3 py-1 rounded-full text-md font-semibold">
          {movie.genre}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
