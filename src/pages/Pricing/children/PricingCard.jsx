import React from "react";
import { FaCheck } from "react-icons/fa";

const PricingCard = () => {
  return (
    <div className=" w-[400px]  rounded-md bg-white shadow-2xl p-4 flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-col justify-center items-center gap-y-4">
        <p className="flex items-center w-full gap-x-2">
          <span className="text-green-500">
            <FaCheck />
          </span>
          <span className="font-medium text-zinc-700 text-xl">
            5'e Kadar Takım Sayısı
          </span>
        </p>
        <p className="flex items-center w-full gap-x-2">
          <span className="text-green-500">
            <FaCheck />
          </span>
          <span className="font-medium text-zinc-700 text-xl">
            Öncelikli Destek
          </span>
        </p>
        <p className="flex items-center w-full gap-x-2">
          <span className="text-green-500">
            <FaCheck />
          </span>
          <span className="font-medium text-zinc-700 text-xl">
            Gelişmiş İstatistikler
          </span>
        </p>
        <p className="flex items-center w-full gap-x-2">
          <span className="text-green-500">
            <FaCheck />
          </span>
          <span className="font-medium text-zinc-700 text-xl">Rozet</span>
        </p>
      </div>
      <div className="flex items-center justify-start pt-3 gap-x-1 border-t w-full ">
        <span className="text-4xl font-semibold text-primary">199.99₺</span>
        <span className="text-zinc-500 text-base">/ay</span>
      </div>
      <button className="px-4 py-2 rounded-md bg-primary hover:bg-primaryDark transition-colors duration-300 text-white w-full">
        Hemen Katıl
      </button>
    </div>
  );
};

export default PricingCard;
