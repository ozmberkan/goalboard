import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow justify-start items-start min-h-screen">
      {children}
    </div>
  );
};

export default Container;
