import { FaMoon, FaSun } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { starterTabs } from "~/data/data";
import { setTheme } from "~/redux/slices/themeSlice";

const Starter = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="py-2.5 px-4 transition-all duration-500 border-b bg-white dark:bg-darkPrimary  dark:border-darkBorder border-neutral-300 flex  items-center justify-between ">
      <div className="flex gap-x-4 items-center">
        <h1 className="px-3 py-0.5 text-xs lg:text-sm rounded-md border border-transparent dark:border-green-500 dark:shadow-2xl dark:shadow-green-500   bg-green-100 dark:bg-darkBox dark:border  text-green-500 uppercase font-extrabold">
          yakında
        </h1>
        <p className="lg:text-sm lg:flex hidden text-xs text-neutral-500 dark:text-darkText font-medium">
          Yakında son sürüm ile karşınızda olacağız.
        </p>
      </div>
      <div className="flex gap-x-3">
        <button
          onClick={changeTheme}
          className="dark:text-darkText text-neutral-500 dark:hover:text-neutral-400"
        >
          {theme === "dark" ? (
            <IoSunnyOutline size={17} />
          ) : (
            <FaMoon size={17} />
          )}
        </button>
        {starterTabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.to}
            className="lg:text-sm text-xs text-neutral-500 font-medium  hover:text-neutral-400 dark:hover:text-neutral-400 dark:text-darkText"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Starter;
