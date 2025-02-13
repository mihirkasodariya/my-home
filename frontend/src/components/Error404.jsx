import React from "react";
import SentimentDissatisfiedSharpIcon from "@mui/icons-material/SentimentDissatisfiedSharp";
export const Error404 = () => {
  document.title = "Error 404";
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div>
        <SentimentDissatisfiedSharpIcon
          sx={{ fontSize: "200px", color: "gray" }}
        />
      </div>
      <div className="text-center text-gray-700">
        <h1 className="text-5xl font-bold my-3">404</h1>
        <h3 className="text-3xl font-semibold my-4">Page not found</h3>
        <p>The page you are looking for doesn't exist.</p>
      </div>
    </div>
  );
};
