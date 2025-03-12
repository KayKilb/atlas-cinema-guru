"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Filters from "./Filters";
import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import { Title } from "@/lib/definitions";

interface HomePageProps {
  titles: Title[];
}

const HomePage: React.FC<HomePageProps> = ({ titles }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [minYear, setMinYear] = useState<number | undefined>(undefined);
  const [maxYear, setMaxYear] = useState<number | undefined>(undefined);
  const [genres, setGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const moviesPerPage = 6;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  interface Movie extends Title {
    image: string;
    favorites: boolean;
    watchLater: boolean;
    favorited: boolean;
  }

  const filterMovies = (): Movie[] => {
    let filtered = titles.map(
      (title): Movie => ({
        ...title,
        image: title.image || "",
        favorites: false,
        watchLater: false,
        favorited: false,
      })
    );
    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (minYear)
      filtered = filtered.filter((movie) => movie.released >= minYear);
    if (maxYear)
      filtered = filtered.filter((movie) => movie.released <= maxYear);
    if (genres.length > 0) {
      filtered = filtered.filter((movie) => genres.includes(movie.genre));
    }
    return filtered;
  };

  const filteredMovies = filterMovies();
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const allGenres = Array.from(
    new Set(titles.map((movie) => movie.genre).filter((genre) => genre))
  );

  return (
    <main className="flex flex-col items-center justify-start px-5 w-full h-full">
      <div className="w-full flex flex-col items-center">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          minYear={minYear}
          setMinYear={setMinYear}
          maxYear={maxYear}
          setMaxYear={setMaxYear}
          genres={genres}
          setGenres={setGenres}
          allGenres={allGenres}
        />

        <MoviesList paginatedMovies={paginatedMovies} />

        <Pagination page={currentPage} setPage={setCurrentPage} />
      </div>
    </main>
  );
};

export default HomePage;
