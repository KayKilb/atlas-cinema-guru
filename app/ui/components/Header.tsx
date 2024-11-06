// Header Component to Display App Logo, User's Email, and Logout Button
// File: components/Header.tsx
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  if (!session) return null;

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <img src="/logo.png" alt="App Logo" className="h-8" />
      <div className="flex items-center">
        <p className="mr-4">{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
