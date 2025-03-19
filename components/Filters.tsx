// components/Filters.tsx
import React, { useState } from "react";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minYear: number | undefined;
  setMinYear: (year: number | undefined) => void;
  maxYear: number | undefined;
  setMaxYear: (year: number | undefined) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  allGenres: string[];
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  genres,
  setGenres,
  allGenres,
}) => {
  // Local state to capture input before submitting with Enter
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full md:justify-between lg:space-x-8 p-6">
      {/* Left side: Search and Year Range */}
      <div className="flex flex-col justify-start w-full lg:w-1/4 space-y-4">
        {/* Search input wrapped in a form */}
        <form onSubmit={handleSearchSubmit} className="w-full">
          <label className="text-white font-thin mb-2 block">Search</label>
          <input
            type="text"
            placeholder="Search Movies..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
          />
        </form>

        {/* Min/Max Year inputs */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-white font-thin mb-2">Min Year</label>
            <input
              type="number"
              placeholder="1990"
              value={minYear || ""}
              onChange={(e) =>
                setMinYear(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-white font-thin mb-2">Max Year</label>
            <input
              type="number"
              placeholder="2024"
              value={maxYear || ""}
              onChange={(e) =>
                setMaxYear(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Right side: Genres */}
      <div className="flex flex-col items-start lg:items-end w-full lg:w-1/4">
        <label className="text-white font-thin text-md mb-2 self-start">
          Genres
        </label>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => {
            const isActive = genres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => {
                  const newGenres = isActive
                    ? genres.filter((g) => g !== genre)
                    : [...genres, genre];
                  setGenres(newGenres);
                }}
                className={`px-2 py-1 text-md font-thin rounded-full border border-[#54F4D0] focus:outline-none transition-colors
            ${
              isActive
                ? "bg-[#54F4D0] text-[#00003C]"
                : "bg-[#00003C] text-white"
            }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
