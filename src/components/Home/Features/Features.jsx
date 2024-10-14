import React from "react";
import FeatureBox from "./FeatureBox";

const Features = () => {
  return (
    <div className="w-full h-[500px] flex justify-center items-start p-12 gap-y-5 flex-col">
      <div className="">
        <h1 className="text-3xl font-semibold text-baseDark">
          goalBoard sizlere ne sunuyor?
        </h1>
      </div>
      <div className="flex gap-x-5">
        <FeatureBox />
        <FeatureBox />
        <FeatureBox />
      </div>
    </div>
  );
};

export default Features;
