import React from "react";

const Hero = () => {
  return (
    <div className="h-[400px] bg-banner-hero bg-no-repeat bg-cover bg-center w-full flex justify-center items-center flex-col">
      <div className="w-2/3 flex justify-center items-center flex-col gap-y-6">
        <h1 className="text-white text-[50px] font-bold text-center">
          goalBoard ile hedeflerinizi belirleyin ve takip edin.
        </h1>
        <p className="text-white text-center text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo nisi ut
          sint suscipit alias a! Repellendus, quisquam et? Non praesentium
          laborum beatae modi id temporibus odio quos, magnam consequatur sunt
          incidunt impedit labore sit qui porro, quae possimus mollitia
          dignissimos numquam! Dolorem, ipsum aspernatur! Est commodi vel
          laudantium non sequi.
        </p>
        <button className="px-4 py-2 rounded-full text-lg bg-white text-base font-semibold">
          Detaylara Git
        </button>
      </div>
    </div>
  );
};

export default Hero;
