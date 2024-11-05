// Sidebar Component for Navigation and Activity Feed
// File: components/Sidebar.tsx
import { useState } from "react";
import { fetchActivities } from "@/lib/data";
import { auth } from "@/auth";
import { useEffect } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activities, setActivities] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setSession(sessionData);
      if (sessionData) {
        const activitiesData = await fetchActivities(1, sessionData.user.email);
        setActivities(activitiesData);
      }
    };
    fetchSession();
  }, []);

  if (!session) return null;

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`transition-all duration-300 ${isExpanded ? "w-64" : "w-16"} bg-gray-900 text-white h-full fixed`}
    >
      <nav className="flex flex-col items-start p-4">
        <a href="/" className="mb-4 text-lg">
          Home
        </a>
        <a href="/favorites" className="mb-4 text-lg">
          Favorites
        </a>
        <a href="/watch-later" className="mb-4 text-lg">
