"use client";

import React from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
  favorited: boolean;
  watchLater: boolean;
}

interface MoviesListProps {
  paginatedMovies: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = ({ paginatedMovies }) => {
  return (
    <div className="grid grid-cols-3 gap-8 w-full px-4 pt-4">
      {paginatedMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            ...movie,
          }}
          onFavoriteToggle={function (id: string): void {
            throw new Error("Function not implemented.");
          }}
          onWatchLaterToggle={function (id: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </div>
  );
};

export default MoviesList;
