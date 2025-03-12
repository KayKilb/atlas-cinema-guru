"use client";

import React, { useState } from "react";
import Link from "next/link";
import ActivityFeed from "./ActivityFeed"; // Ensure the correct path

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#54F4D0",
        height: "100vh",
        width: isHovered ? "200px" : "97px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "1rem",
        transition: "width 0.3s ease",
        flexDirection: "column",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Home item */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9C3 7.34315 4.34315 6 6 6H13.5L16.5 9H24C25.6569 9 27 10.3431 27 12V21C27 22.6569 25.6569 24 24 24H6C4.34315 24 3 22.6569 3 21V9Z"
              fill="white"
            />
          </svg>
          {isHovered && (
            <span style={{ color: "white", fontWeight: "bold" }}>Home</span>
          )}
        </div>
      </Link>

      {/* Favorites item */}
      <Link
        href="/favorites"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9307 6.47966C15.4246 4.9595 17.5753 4.9595 18.0692 6.47966L19.834 11.9111C20.0549 12.591 20.6884 13.0512 21.4032 13.0512H27.1142C28.7126 13.0512 29.3772 15.0966 28.0841 16.0361L23.4638 19.393C22.8855 19.8131 22.6435 20.5579 22.8644 21.2377L24.6292 26.6692C25.1231 28.1893 23.3832 29.4534 22.0901 28.5139L17.4698 25.1571C16.8915 24.7369 16.1084 24.7369 15.5301 25.1571L10.9098 28.5139C9.61671 29.4534 7.87682 28.1893 8.37075 26.6692L10.1355 21.2377C10.3564 20.5579 10.1144 19.8131 9.53614 19.393L4.91586 16.0361C3.62273 15.0966 4.28731 13.0512 5.88571 13.0512H11.5967C12.3115 13.0512 12.945 12.591 13.1659 11.9111L14.9307 6.47966Z"
              fill="white"
            />
          </svg>
          {isHovered && (
            <span style={{ color: "white", fontWeight: "bold" }}>
              Favorites
            </span>
          )}
        </div>
      </Link>

      {/* Watch Later item */}
      <Link
        href="/watch-later"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 27C21.6274 27 27 21.6274 27 15C27 8.37258 21.6274 3 15 3C8.37258 3 3 8.37258 3 15C3 21.6274 8.37258 27 15 27ZM16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9V15C14 15.2652 14.1054 15.5196 14.2929 15.7071L18.5355 19.9497C18.9261 20.3403 19.5592 20.3403 19.9497 19.9497C20.3403 19.5592 20.3403 18.9261 19.9497 18.5355L16 14.5858V9Z"
              fill="white"
            />
          </svg>
          {isHovered && (
            <span style={{ color: "white", fontWeight: "bold" }}>
              Watch Later
            </span>
          )}
        </div>
      </Link>

      <div style={{ display: isHovered ? "block" : "none" }}>
        <ActivityFeed />
      </div>
    </div>
  );
};

export default NavBar;
