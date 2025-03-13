"use client";

import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `/api/favorites?page=${currentPage}&limit=${moviesPerPage}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleFavorite = async (id: string, favorited: boolean) => {
    try {
      if (favorited) {
        const response = await fetch(`/api/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          const newFavorite = await response.json();
          setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        }
      } else {
        await fetch(`/api/favorites/${id}`, { method: "DELETE" });
        setFavorites((prevFavorites) =>
          prevFavorites.filter((movie) => movie.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="favorites-page-container min-h-screen text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Favorites</h1>

      <MoviesList
        paginatedMovies={favorites}
        favorites={favorites.map((movie) => movie.id)}
        watchLater={[]}
        onFavoriteToggle={handleToggleFavorite}
        onWatchLaterToggle={() => {}}
      />

      <div className="pagination-controls flex justify-center mt-8 space-x-4">
        <Pagination
          currentPage={currentPage}
          totalMovies={favorites.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Favorites;
