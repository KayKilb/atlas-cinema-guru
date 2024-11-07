// Header Component to Display App Logo, User's Email, and Logout Button
// File: app/components/Header.tsx
"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  // Display loading state while session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Check if the session exists and has a user
  if (!session || !session.user) {
    return <div>Please log in.</div>;
  }

  return (
    <div className="flex items-center justify-between p-2.5 bg-[#54F4D0] text-white">
      <div className="flex items-center gap-2">
        <svg
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.375 6.5V32.5M27.625 6.5V32.5M4.875 13H11.375M27.625 13H34.125M4.875 19.5H34.125M4.875 26H11.375M27.625 26H34.125M6.5 32.5H32.5C33.3975 32.5 34.125 31.7725 34.125 30.875V8.125C34.125 7.22754 33.3975 6.5 32.5 6.5H6.5C5.60254 6.5 4.875 7.22754 4.875 8.125V30.875C4.875 31.7725 5.60254 32.5 6.5 32.5Z"
            stroke="#00003C"
            strokeWidth="2"
          />
        </svg>
        <h3 className="m-0 text-[#00003C]">Cinema Guru</h3>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[#00003C]">Welcome, {session.user.email}</span>
        {/* Logout SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="13"
          height="15"
          fill="#000061"
        >
          <path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z" />
          <path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z" />
        </svg>
        <button
          onClick={() => signOut()}
          className="text-[#00003C] border-none rounded cursor-pointer p-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
