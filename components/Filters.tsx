import React from "react";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  minYear: number | undefined;
  setMinYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxYear: number | undefined;
  setMaxYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
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
}) => {
  const allGenres = [
    "Romance",
    "Horror",
    "Drama",
    "Action",
    "Mystery",
    "Fantasy",
    "Thriller",
    "Western",
    "Sci-Fi",
    "Adventure",
  ];
  const handleGenreClick = (genre: string) => {
    const newGenres = genres.includes(genre)
      ? genres.filter((g) => g !== genre)
      : [...genres, genre];
    setGenres(newGenres);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:space-x-8 p-4">
      {/* Search & Year Filters */}
      <div className="flex flex-col justify-start lg:w-1/2 pr-8">
        {/* Search Label and Input */}
        <label className="text-white font-semibold mb-1 text-lg">Search</label>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
        />

        {/* Year Labels and Inputs */}
        <div className="flex space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            <label className="text-white font-semibold mb-1 text-lg">
              Min Year
            </label>
            <input
              type="number"
              placeholder="Min Year"
              value={minYear || ""}
              onChange={(e) =>
                setMinYear(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="p-2 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-white font-semibold mb-1 text-lg">
              Max Year
            </label>
            <input
              type="number"
              placeholder="Max Year"
              value={maxYear || ""}
              onChange={(e) =>
                setMaxYear(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="p-2 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Genres Filter */}
      <div className="flex flex-col items-start lg:items-end lg:w-1/2 pl-8">
        <h1 className="self-start font-semibold text-lg text-white mb-2">
          Genres
        </h1>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 text-sm border-2 border-[#54F4D0] rounded-full cursor-pointer transition-all duration-200 ${
                genres.includes(genre)
                  ? "bg-[#39CCCC] text-[#00003C]"
                  : "bg-[#001F3F] text-white"
              } focus:outline-none`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
