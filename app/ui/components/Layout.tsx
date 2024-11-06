//app/ui/components/Layout.tsx

import { signOut, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full">
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <Link href="/">
            <a className="font-bold text-lg">Atlas Cinema Guru</a>
          </Link>
          {session ? (
            <div className="flex items-center">
              <span>{session.user.email}</span>
              <button
                onClick={() => signOut()}
                className="ml-4 px-3 py-1 bg-red-500 rounded"
              >
                Logout
              </button>
            </div>
          ) : null}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
