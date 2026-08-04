"use client";

import React from "react";
import TextHeader from "./TextHeader";

const NoData: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center border rounded shadow-lg p-4">
      {/* Title */}
      <TextHeader
        title={"No data found ..."}
        fontSize="text-lg"
        textColor="text-gray-400"
      />
    </div>
  );
};

export default NoData;
