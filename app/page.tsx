// app/page.tsx
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

const Page: React.FC = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/titles");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Title[] = await response.json();
        setTitles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <HomePage />
    </div>
  );
};

export default Page;
