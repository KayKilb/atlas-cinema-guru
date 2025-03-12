// app/api/page.tsx
"use client";

import { useEffect, useState } from "react";
import HomePage from "@/components/HomePage";

interface Title {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
}

interface PageProps {
  titles: Title[];
}

export default function Page() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("/api/titles");
        if (!response.ok) {
          throw new Error("Failed to fetch titles");
        }
        const data = await response.json();
        setTitles(data.title);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-center h-full">
      <HomePage titles={titles} />
    </div>
  );
}
