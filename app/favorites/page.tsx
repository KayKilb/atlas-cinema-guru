// app/favorites/page.tsx
"use client";

import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";
import { Title } from "@/lib/definitions";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Title[]>([]);
  const [totalFavorites, setTotalFavorites] = useState(0);
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
        // Assuming your API returns an object with favorites array and total count
        setFavorites(data.favorites || []);
        setTotalFavorites(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Since the Favorites page only shows favorited movies,
  // toggling the favorite should remove the movie.
  const handleToggleFavorite = async (id: string) => {
    try {
      await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((movie) => movie.id !== id)
      );
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
          totalMovies={totalFavorites}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Favorites;
