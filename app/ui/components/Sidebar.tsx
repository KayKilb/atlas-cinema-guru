// app/ui/components/Sidebar.tsx

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white ${
        isExpanded ? "w-64" : "w-16"
      } transition-all duration-200`}
    >
      <nav className="mt-8">
        <Link href="/">
          <a className="block py-4 pl-4 hover:bg-gray-700">Home</a>
        </Link>
        <Link href="/favorites">
          <a className="block py-4 pl-4 hover:bg-gray-700">Favorites</a>
        </Link>
        <Link href="/watch-later">
          <a className="block py-4 pl-4 hover:bg-gray-700">Watch Later</a>
        </Link>
      </nav>
      <div className="mt-8 p-4">
        <h2 className="text-center text-sm font-semibold">Recent Activities</h2>
        {/* Activity feed can be fetched and displayed here */}
      </div>
    </aside>
  );
}
