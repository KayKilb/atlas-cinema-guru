// app/ui/home/page.tsx

import { useState, useEffect } from "react";
import MovieCard from "../components/Moviecard";
import Layout from "../components/Layout";
import { fetchTitles } from "@/lib/data";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      const fetchedMovies = await fetchTitles(page, query);
      setMovies(fetchedMovies);
    }
    loadMovies();
  }, [page, query]);

  return (
    <Layout>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mb-4"
        />
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="mt-4">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </Layout>
  );
}
