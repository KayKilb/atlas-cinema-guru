// app/watch-later/page.tsx
"use client";

import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      try {
        const response = await fetch(
          `/api/watch-later?page=${currentPage}&limit=${moviesPerPage}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setWatchLaterMovies(data.watchLater || []);
      } catch (error) {
        console.error("Failed to fetch watch later movies:", error);
      }
    };

    fetchWatchLaterMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleWatchLater = async (id: string) => {
    try {
      setWatchLaterMovies((prevMovies) => {
        const movieExists = prevMovies.some((movie) => movie.id === id);
        if (movieExists) {
          // Remove the movie from watch later
          return prevMovies.filter((movie) => movie.id !== id);
        } else {
          // Add the movie to watch later
          return [
            ...prevMovies,
            { id }, // This assumes the movie object only needs the `id` for now
          ];
        }
      });

      // Call API to handle the toggling on the server side
      await fetch(`/api/watch-later/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Failed to toggle watch later:", error);
    }
  };

  return (
    <div className="watch-later-page-container min-h-screen text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Watch Later</h1>

      <MoviesList
        paginatedMovies={watchLaterMovies}
        favorites={[]}
        watchLater={watchLaterMovies.map((movie) => movie.id)}
        onFavoriteToggle={() => {}}
        onWatchLaterToggle={handleToggleWatchLater} // Pass handler here
      />

      <div className="pagination-controls flex justify-center mt-8 space-x-4">
        <Pagination
          currentPage={currentPage}
          totalMovies={watchLaterMovies.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default WatchLater;
