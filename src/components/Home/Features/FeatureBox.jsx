import React from "react";

const FeatureBox = () => {
  return (
    <div className="w-full h-[200px] bg-base  shadow-md justify-start items-start rounded-md p-5 flex flex-col gap-y-5 relative">
      <h1 className="text-xl font-semibold text-white">
        goalBoard ile hedeflerinize kolay ulaşın!
      </h1>
      <p className="text-zinc-200 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fugiat
        ullam nisi error repudiandae? Eos neque reprehenderit saepe laborum
        fugiat?
      </p>
      <button className="px-4 py-2 rounded-md bg-white text-base font-semibold border border-transparent hover:border hover:border-white hover:bg-base hover:text-white">
        Detaylar
      </button>
    </div>
  );
};

export default FeatureBox;
