// app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : session ? (
        <div>
          <h1>Welcome to Cinema Guru, {session.user?.email}!</h1>
          <p>Browse and add movies to your favorites or watch later list.</p>
        </div>
      ) : (
        <div>
          <h1>Welcome to Cinema Guru!</h1>
          <p>Please sign in to start tracking your favorite movies.</p>
        </div>
      )}
    </div>
  );
}
