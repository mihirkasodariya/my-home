import React from "react";

export const UnderMaintenance = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-5" style={{ fontFamily: "Arial, sans-serif"}}>
      <h1 className="text-xl lg:text-5xl">We'll Be Back Soon!</h1>
      <p className="text-[14px] text-center lg:text-lg px-5">
        Our website is currently undergoing scheduled maintenance. We appreciate
        your patience.
      </p>
      <p className="text-sm text-[#6c757d] lg:text-lg">- The Team</p>
    </div>
  );
};
