// app/ui/favorites/page.tsx
import { useEffect, useState } from "react";
import MovieCard from "../components/Moviecard";
import Layout from "../components/Layout";
import { fetchFavorites } from "@/lib/data";
import { useSession } from "next-auth/react";

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadFavorites() {
      if (session) {
        const userEmail = session.user?.email;
        if (userEmail) {
          const fetchedFavorites = await fetchFavorites(page, userEmail);
          setFavorites(fetchedFavorites);
        }
      }
    }
    loadFavorites();
  }, [page, session]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Favorites</h1>
        <div className="grid grid-cols-3 gap-4">
          {favorites.map((movie) => (
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
