// components/Genre.tsx
"use client";

import { useState, useEffect } from "react";

interface GenreProps {
  onGenresSelected: (genres: string[]) => void;
}

const Genre: React.FC<GenreProps> = ({ onGenresSelected }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenreData();
  }, []);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const url = new URL("/api/titles", window.location.origin);
        if (selectedGenres.length > 0) {
          url.searchParams.set("genres", selectedGenres.join(","));
        }
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API response has a 'title' property for the films
        onGenresSelected(selectedGenres);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, [selectedGenres]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  return (
    <div className="bg-lumi-navy p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-white">Genre</h3>
      <div className="grid grid-cols-5 gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreToggle(genre)}
            className={`p-2 rounded-full border border-lumi-teal ${
              selectedGenres.includes(genre) ? "bg-lumi-teal" : ""
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Genre;