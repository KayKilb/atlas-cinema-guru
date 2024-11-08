// components/Home.tsx
"use client";

import { useState, useEffect } from "react";
import MovieTile from "./MovieTitle";
import SearchBar from "./SearchBar";
import Genre from "./Genre";
import PageButtons from "./PageButtons";

interface HomeProps {
  activeSection: string;
}

interface Film {
  title: string;
  id: string;
  released: string;
  synopsis: string;
  genre: string;
}

const Home: React.FC<HomeProps> = ({ activeSection }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  const [searchParams, setSearchParams] = useState<{
    query: string;
    minYear?: number;
    maxYear?: number;
  }>({
    query: "",
    minYear: undefined,
    maxYear: undefined,
  });

  const filmsPerPage = 6;
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleTitlesFetched = (titles: Film[]) => {
    setFilms(titles);
  };

  const handleSearch = (params: {
    query: string;
    minYear?: number;
    maxYear?: number;
  }) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleGenresSelected = (genres: string[]) => {
    setSelectedGenres(genres);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true); // Start loading
      try {
        const url = new URL("/api/titles", window.location.origin);
        url.searchParams.set("page", currentPage.toString());
        url.searchParams.set("query", searchParams.query);
        if (searchParams.minYear !== undefined) {
          url.searchParams.set("minYear", searchParams.minYear.toString());
        }
        if (searchParams.maxYear !== undefined) {
          url.searchParams.set("maxYear", searchParams.maxYear.toString());
        }
        if (selectedGenres.length > 0) {
          url.searchParams.set("genres", selectedGenres.join(","));
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched films:", data); // Debugging line
        setFilms(Array.isArray(data.title) ? data.title : []);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFilms();
  }, [currentPage, searchParams, selectedGenres]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div>
      {activeSection === "home" && (
        <div className="flex justify-between mb-4">
          <SearchBar
            onTitlesFetched={handleTitlesFetched}
            onSearch={handleSearch}
          />
          <Genre onGenresSelected={handleGenresSelected} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 gap-4">
        {films.map((film) => (
          <MovieTile
            key={film.id}
            title={film.title}
            coverArtUrl={`/images/${film.id}.webp`}
            released={film.released}
            synopsis={film.synopsis}
            genre={film.genre}
          />
        ))}
      </div>
      <PageButtons
        totalItems={100}
        itemsPerPage={filmsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Home;
