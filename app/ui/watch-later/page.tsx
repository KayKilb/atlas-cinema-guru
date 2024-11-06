// app/ui/watch-later/page.tsx

import { useEffect, useState } from "react";
import MovieCard from "@/ui/components/MovieCard";
import Layout from "@/ui/components/Layout";
import { fetchWatchLaters } from "@/lib/data";
import { useSession } from "next-auth/react";

export default function WatchLaterPage() {
  const { data: session } = useSession();
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadWatchLater() {
      if (session) {
        const userEmail = session.user?.email;
        if (userEmail) {
          const fetchedWatchLater = await fetchWatchLaters(page, userEmail);
          setWatchLaterList(fetchedWatchLater);
        }
      }
    }
    loadWatchLater();
  }, [page, session]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Watch Later</h1>
        <div className="grid grid-cols-3 gap-4">
          {watchLaterList.map((movie) => (
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
