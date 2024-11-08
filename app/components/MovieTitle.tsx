// components/MovieTile.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import ClockFull from "@/assets/clockfull.svg";
import ClockOutline from "@/assets/clockoutline.svg";
import StarFull from "@/assets/starfull.svg";
import StarOutline from "@/assets/staroutline.svg";

interface MovieTileProps {
  title: string;
  coverArtUrl: string;
  released: string;
  synopsis: string;
  genre: string;
}

const MovieTile: React.FC<MovieTileProps> = ({
  title,
  coverArtUrl,
  released,
  synopsis,
  genre,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  // Toggle favorite status with API call
  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);
    try {
      const method = isFavorited ? "DELETE" : "POST";
      await fetch(`/api/favorites/${title}`, { method });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  // Toggle watch later status with API call
  const toggleWatchLater = async () => {
    setIsWatchLater(!isWatchLater);
    try {
      const method = isWatchLater ? "DELETE" : "POST";
      await fetch(`/api/watch-later/${title}`, { method });
    } catch (error) {
      console.error("Failed to update watch later status:", error);
    }
  };

  return (
    <div
      className="movie-tile rounded-lg border border-lumi-teal overflow-hidden shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with fallback */}
      <Image
        src={coverArtUrl || "/images/placeholder.webp"}
        alt={`${title} cover art`}
        width={300}
        height={400}
        className="w-full h-auto"
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder.webp"; // Fallback for missing images
        }}
      />

      {/* Favorite and Watch Later Icons */}
      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={toggleFavorite}>
            <Image
              src={isFavorited ? StarFull : StarOutline}
              alt={isFavorited ? "Remove from favorites" : "Add to favorites"}
              width={20}
              height={20}
            />
          </button>
          <button onClick={toggleWatchLater}>
            <Image
              src={isWatchLater ? ClockFull : ClockOutline}
              alt={
                isWatchLater ? "Remove from watch later" : "Add to watch later"
              }
              width={20}
              height={20}
            />
          </button>
        </div>
      )}

      {/* Information Overlay */}
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white p-2 text-sm">
          <div className="flex justify-between items-center">
            <div>
              {title} ({released})
            </div>
          </div>
          <div className="mt-1">{synopsis}</div>
          <div className="mt-1">Genre: {genre}</div>
        </div>
      )}
    </div>
  );
};

export default MovieTile;
