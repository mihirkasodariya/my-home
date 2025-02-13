import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const NavigationBar = () => {
  const location = useLocation();
  const { id } = useParams(); // Grabs the event ID from the URL
  const [eventName, setEventName] = useState("");

  // Fetch event name when the ID is available
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.BASE_URL}/api/v1/events/${id}`)
        .then((response) => {
          setEventName(response.data.event.title); // Set event name
        })
        .catch((error) => {
          console.error("Error fetching event details:", error);
        });
    }
  }, [id]);

  const path = location.pathname; // Get the full path (e.g., '/about')
  const pathSegments = path.split("/").filter(Boolean); // Split the path and remove empty segments

  return (
    <div className="max-w-[1280px] mx-5 lg:mx-auto my-10">
      <div className="bg-gray-100 p-3 lg:p-4 shadow-lg capitalize rounded-lg text-xs lg:text-sm">
        Home{" "}
        {pathSegments.map((item, index) => {
          // Check if we're at the last segment (event ID)
          if (index === pathSegments.length - 1 && id) {
            // Replace the ID with the event name
            return (
              <span key={index} className="font-medium text-xs lg:text-sm capitalize">
                / {eventName || "Loading..."}
              </span>
            );
          }

          // Render other segments as they are (e.g., "/event")
          return (
            <span key={index} className="font-medium text-xs lg:text-sm capitalize">
              / {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};
