import { Link } from "react-router-dom";
import TargetIcon from "~/assets/Target.svg";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex lg:justify-center lg:items-center items-start lg:p-0 p-7  flex-grow lg:min-h-[790px] min-h-[600px] relative overflow-hidden">
      <motion.img
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        src={TargetIcon}
        className=" absolute lg:-left-[650px] -left-[200px] bottom-0 "
      />
      <motion.img
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        src={TargetIcon}
        className="w-1/3 absolute lg:-right-[330px] -right-[65px] top-0  brightness-50"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-6 lg:w-1/3 w-full  lg:drop-shadow-none drop-shadow-xl 
 p-4 rounded-md  justify-center items-center text-center "
      >
        <div className="w-full flex flex-col lg:gap-2 gap-y-3 ">
          <h1 className="lg:text-[85px] text-[44px] font-extrabold text-primary drop-shadow-lg">
            {user ? "Hoş geldin!" : "goalBoard"}
          </h1>
          <div className="lg:font-medium lg:text-zinc-800 font-semibold text-zinc-600 lg:text-xl text-base">
            {user ? (
              <p>
                Hoş geldin{" "}
                <span className="font-semibold text-primary">
                  {user.username}
                </span>{" "}
                profiline giderek hemen hedeflerini oluşturabilirsin!
              </p>
            ) : (
              `Projelerinizi yönetmenin en kolay yolu! Gerçek zamanlı
            güncellemeler, görev atamaları ve yorumlarla ekibinizle iş birliği
            yaparak hedeflerinize ulaşın.`
            )}
          </div>
        </div>
        <div className="w-full  flex gap-5 justify-center items-center">
          {user ? (
            <Link
              to={`/profile/${user.username}`}
              className="lg:w-2/3 font-medium lg:text-white text-white  bg-primary rounded-md lg:rounded-full 
            hover:bg-primaryDark transition-colors duration-300 lg:border-zinc-200 px-4 py-1 lg:px-4 lg:py-2"
            >
              Profilim
            </Link>
          ) : (
            <Link
              to="/signup"
              className="lg:w-2/3 font-medium lg:text-white text-white  bg-primary rounded-md lg:rounded-xl 
            hover:bg-primaryDark transition-colors duration-300 lg:border-zinc-200 px-4 py-1 lg:px-4 lg:py-2"
            >
              Hemen Başla!
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
