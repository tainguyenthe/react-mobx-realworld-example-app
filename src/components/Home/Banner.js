import React from "react";

const Banner = ({ appName, token }) => {
  // Don't show banner
  // if (token) {
  //   return null;
  // }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{appName.toLowerCase()}</h1>
      </div>
    </div>
  );
};

export default Banner;
