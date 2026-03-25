"use client";
import React from "react";

const DitermsSelector = ({ diTerms }: { diTerms: string }) => {
  return (
    <div>
      <div className="w-full float-right">
        <div data-di-terms={diTerms}></div>
      </div>
    </div>
  );
};

export default DitermsSelector;
