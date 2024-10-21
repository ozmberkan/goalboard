import React from "react";
import Bubble from "~/assets/Bubble.svg";
import PricingCard from "./children/PricingCard";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <div className="flex-grow flex items-center justify-start flex-col relative p-12 lg:p-24 lg:gap-y-5 gap-y-12">
      <Link
        to="/"
        className="absolute top-6 right-6 p-3 bg-white border rounded-md text-2xl text-zinc-500 z-10 hover:text-zinc-700"
      >
        <MdCancel />
      </Link>
      <img src={Bubble} className="absolute top-0 z-0" />
      <div className="flex flex-col gap-y-3 items-center justify-center z-10 lg:mt-0 mt-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[56px] font-extrabold bg-gradient-to-tr text-transparent bg-clip-text from-primary to-primaryDark"
        >
          Premium'a Katıl!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-medium text-zinc-700"
        >
          Premium üyeliğe sahip olarak daha fazla özellikten yararlanın.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 1 }}
        className="w-full  flex justify-center items-center z-10 lg:p-5 lg:h-[500px]"
      >
        <PricingCard />
      </motion.div>
    </div>
  );
};

export default Pricing;
