import React from "react";

export const LeftPanel = () => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-screen bg-cover bg-center bg-no-repeat xl:[background-size:100%_100%]"
      style={{
        backgroundImage: "url('/images/login-bg.png')",
      }}
    ></div>
  );
};
