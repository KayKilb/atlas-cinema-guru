// components/ActivityFeed.tsx
"use client";

import React, { useEffect, useState } from "react";

interface Activity {
  type: string;
  title: string;
  timestamp: number;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div
      style={{
        // Make the feed match the smaller NavBar style
        fontSize: "12px",
        width: "100%",
        padding: "0.5rem",
        color: "#00003c",
      }}
    >
      <h3
        style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#00003c" }}
      >
        Latest Activities
      </h3>
      <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const date = new Date(activity.timestamp);
            const formattedDate = date.toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });

            if (activity.type === "removed") return null;

            // Determine the message
            const message =
              activity.type === "favorite" ? "Favorited" : "Added";

            return (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <span>{formattedDate}</span> - {message}{" "}
                <strong>{activity.title}</strong> to{" "}
                {activity.type === "favorite" ? "Favorites" : "Watch Later"}
              </li>
            );
          })
        ) : (
          <li style={{ color: "#666" }}>No recent activities</li>
        )}
      </ul>
    </div>
  );
}
