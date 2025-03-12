"use client";

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
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard = ({
  movie,
  onFavoriteToggle,
  onWatchLaterToggle,
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [favorites, setFavorites] = useState<boolean>(movie.favorited);
  const [watchLater, setWatchLater] = useState<boolean>(movie.watchLater);

  const toggleFavorite = async (id: string) => {
    setFavorites((prev) => (prev ? false : true));
    const response = await fetch(`/api/favorites/${movie.id}`, {
      method: favorites ? "DELETE" : "POST",
    });
  };

  const toggleWatchLater = async (id: string) => {
    setWatchLater((prev) => (prev ? false : true));
    const response = await fetch(`/api/watch-later/${movie.id}`, {
      method: watchLater ? "DELETE" : "GET",
    });
  };

  return (
    <div
      className="relative overflow-hidden transition-transform transform rounded-xl border-2 border-[#54F4D0] p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full aspect-square object-cover rounded-t-lg"
      />
      {isHovered && (
        <div className="absolute bottom-0 w-full text-white p-3 bg-[#000061]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold truncate">
              {movie.title} <span className="text-sm">({movie.released})</span>
            </h3>
          </div>
          <p className="text-sm">{movie.synopsis}</p>
          <div className="mt-2">
            <span className="inline-block bg-[#1DD2AF] text-white rounded-full px-3 py-1 text-xs">
              {movie.genre}
            </span>
          </div>
        </div>
      )}
      <div className="absolute top-2 right-2 flex flex-row gap-2">
        <button onClick={() => toggleFavorite(movie.id)}>
          {favorites ? (
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9307 1.4796C11.4246 -0.0405635 13.5753 -0.0405627 14.0692 1.4796L15.834 6.91106C16.0549 7.5909 16.6884 8.05119 17.4032 8.05119H23.1142C24.7126 8.05119 25.3772 10.0966 24.0841 11.0361L19.4638 14.3929C18.8855 14.8131 18.6435 15.5578 18.8644 16.2376L20.6292 21.6691C21.1231 23.1893 19.3832 24.4534 18.0901 23.5139L13.4698 20.157C12.8915 19.7369 12.1084 19.7369 11.5301 20.157L6.90984 23.5139C5.61671 24.4534 3.87682 23.1893 4.37075 21.6691L6.13554 16.2376C6.35643 15.5578 6.11444 14.8131 5.53614 14.3929L0.915861 11.0361C-0.377266 10.0966 0.287313 8.05119 1.88571 8.05119H7.59669C8.31151 8.05119 8.94503 7.5909 9.16593 6.91106L10.9307 1.4796Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0461 2.03341C13.3396 1.10007 14.6604 1.10006 14.9539 2.0334L17.1479 9.00983C17.2789 9.42642 17.6651 9.70982 18.1018 9.70984L25.2687 9.71012C26.2294 9.71016 26.6373 10.933 25.869 11.5098L20.0153 15.9049C19.6763 16.1595 19.5346 16.6001 19.6617 17.0045L21.8841 24.0731C22.1755 25.0002 21.1069 25.7562 20.3297 25.1727L14.6004 20.8717C14.2447 20.6047 13.7553 20.6047 13.3996 20.8717L7.67026 25.1727C6.89306 25.7562 5.82446 25.0002 6.11594 24.0731L8.33827 17.0045C8.46542 16.6001 8.32375 16.1595 7.98473 15.9049L2.13095 11.5098C1.36267 10.933 1.77061 9.71016 2.73133 9.71012L9.89822 9.70984C10.3349 9.70982 10.7211 9.42642 10.8521 9.00983L13.0461 2.03341Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
        <button onClick={() => toggleWatchLater(movie.id)}>
          {watchLater ? (
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 11.3333V17L21.25 21.25M29.75 17C29.75 24.0416 24.0416 29.75 17 29.75C9.95837 29.75 4.25 24.0416 4.25 17C4.25 9.95837 9.95837 4.25 17 4.25C24.0416 4.25 29.75 9.95837 29.75 17Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 11.3333V17L21.25 21.25M29.75 17C29.75 24.0416 24.0416 29.75 17 29.75C9.95837 29.75 4.25 24.0416 4.25 17C4.25 9.95837 9.95837 4.25 17 4.25C24.0416 4.25 29.75 9.95837 29.75 17Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
