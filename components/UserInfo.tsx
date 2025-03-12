"use client";

import { signOut, useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session) return <span>Please log in</span>;

  return (
    <div
      className="user-info"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "10px",
      }}
    >
      {/* SVG Icon Film thing */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="29"
        viewBox="0 0 33 29"
        fill="none"
        style={{ stroke: "#000061" }}
      >
        <path
          d="M8.37501 1.5V27.5M24.625 1.5V27.5M1.875 8H8.375M24.625 8H31.125M1.875 14.5H31.125M1.875 21H8.375M24.625 21H31.125M3.5 27.5H29.5C30.3975 27.5 31.125 26.7725 31.125 25.875V3.125C31.125 2.22754 30.3975 1.5 29.5 1.5H3.5C2.60254 1.5 1.875 2.22754 1.875 3.125V25.875C1.875 26.7725 2.60254 27.5 3.5 27.5Z"
          strokeWidth="2"
        />
      </svg>
      <h3 className="text-[#000061] ml-2 m-0 text-2xl font-extrabold">
        Cinema Guru
      </h3>

      {/* User Email / Welcome msg */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          color: "#00003C",
        }}
      >
        <span style={{ marginLeft: "20px" }}>
          Welcome, {session.user.email}
        </span>
      </div>

      {/* Log Out Button with SVG Icon */}
      <button
        onClick={() => signOut()}
        style={{
          color: "#000061",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          paddingRight: "10px",
        }}
      >
        {/* Logout SVG Icon */}
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
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
