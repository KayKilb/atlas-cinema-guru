// components/Filters.tsx
import React, { useEffect, useState } from "react";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minYear: number | undefined;
  setMinYear: (year: number | undefined) => void;
  maxYear: number | undefined;
  setMaxYear: (year: number | undefined) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  allGenres: string[]; // List of all genres provided from HomePage
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
  return (
    <div className="p-6 flex flex-col lg:flex-row lg:justify-between lg:space-x-8 lg:space-y-0 space-y-6 w-full">
      {/* Left side: Search and Year Range */}
      <div className="flex flex-col space-y-6 w-full lg:w-1/2">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">
            Search by Title
          </label>
          <input
            type="text"
            placeholder="e.g. Inception"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
          />
        </div>
        {/* Year Range */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-white font-semibold mb-2">Min Year</label>
            <input
              type="number"
              placeholder="1950"
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
            <label className="text-white font-semibold mb-2">Max Year</label>
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
      <div className="flex flex-col items-start lg:items-end w-full lg:w-1/2">
        <label className="text-white font-semibold text-lg mb-3">Genres</label>
        <div className="flex flex-wrap gap-3">
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
                className={`px-3 py-1 rounded-full focus:outline-none border border-[#54F4D0] transition-colors
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
