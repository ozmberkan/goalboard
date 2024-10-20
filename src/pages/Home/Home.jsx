import { Link } from "react-router-dom";
import TargetIcon from "~/assets/Target.svg";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex justify-center items-center lg:p-0 p-7  flex-grow lg:min-h-[790px] min-h-[600px] relative overflow-hidden">
      <motion.img
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        src={TargetIcon}
        className=" absolute lg:-left-[650px] -left-[200px] "
      />
      <motion.img
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        src={TargetIcon}
        className="w-1/3 absolute lg:-right-[330px] -right-[65px] top-0  brightness-50"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-6 lg:w-1/3 w-full lg:bg-transparent  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 lg:drop-shadow-none drop-shadow-xl 
 bg-white p-4 rounded-md  justify-center items-center text-center "
      >
        <div className="w-full flex flex-col lg:gap-0 gap-y-3 ">
          <h1 className="lg:text-[85px] text-[44px] font-extrabold text-primary drop-shadow-lg">
            goalBoard
          </h1>
          <p className="font-medium lg:text-zinc-500 text-zinc-700 lg:text-base text-xs">
            Projelerinizi yönetmenin en kolay yolu! Gerçek zamanlı
            güncellemeler, görev atamaları ve yorumlarla ekibinizle iş birliği
            yaparak hedeflerinize ulaşın.
          </p>
        </div>
        <div className="w-full  flex gap-5 justify-center items-center">
          <Link
            to="/signup"
            className="lg:w-full font-medium lg:text-zinc-500 text-zinc-700 lg:bg-white rounded-md lg:rounded-full hover:bg-zinc-50 transition-colors duration-300 border border-zinc-600 lg:border-zinc-200 px-4 py-1 lg:px-4 lg:py-2"
          >
            Hemen Başla!
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
