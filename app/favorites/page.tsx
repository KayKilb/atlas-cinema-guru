"use client";

import React, { useEffect, useState } from "react";

import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";

interface Movie {
  id: number;
  title: string;
  synopsis: string;
  released: string;
  genre: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?page=${page}`);
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [page]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center mb-6 font-inter">
        Favorites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-8">
        {favorites.map((movie) => (
          <div className="flex justify-center" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default Favorites;
