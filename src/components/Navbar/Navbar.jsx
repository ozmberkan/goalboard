import { Link } from "react-router-dom";
import { navTabs } from "~/data/data";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { GiPadlockOpen } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import ProfileMenu from "./Menus/ProfileMenu";
import NotificationMenu from "./Menus/NotificationMenu";
import MobileMenu from "./Menus/MobileMenu";
import Starter from "./children/Starter";
import ForLightLogo from "~/assets/Logos/goalBoardTextDark.svg";
import ForDarkLogo from "~/assets/Logos/goalBoardTextLight.svg";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const [dropdown, setDropdown] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const exit = async () => {
    try {
      localStorage.removeItem("user");
      await signOut(auth);
      toast.success("Çıkış yapıldı!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Çıkış yapılırken hata!");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Starter />
        <div className="py-5 lg:px-14 transition-all duration-500 px-5 border-b bg-white dark:bg-darkPrimary dark:border-darkBorder border-neutral-300 flex justify-between items-center">
          <Link to="/">
            <img
              src={theme === "dark" ? ForDarkLogo : ForLightLogo}
              className="w-32"
            />
          </Link>

          {!user && (
            <>
              {!isTabletOrMobile && (
                <>
                  <div className="flex items-center gap-x-4 ">
                    {navTabs.map((tab) => (
                      <Link
                        key={tab.id}
                        to={tab.to}
                        className="font-medium text-neutral-500 hover:text-neutral-400"
                      >
                        {tab.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/signin"
                    className="px-4 py-1 font-semibold flex items-center gap-x-2 transition-all duration-300 rounded-md border-2 border-primary dark:bg-darkBox dark:border-darkBorder dark:text-darkText dark:hover:text-neutral-400 text-primary hover:bg-primary hover:border-transparent hover:text-white"
                  >
                    <GiPadlockOpen />
                    Giriş Yap
                  </Link>
                </>
              )}
            </>
          )}

          {!user && isTabletOrMobile && (
            <div className="flex gap-x-1">
              <MobileMenu setDropdown={setDropdown} />
              <Link
                to="/signin"
                className="bg-primary dark:bg-transparent dark:border dark:border-darkBorder dark:text-darkText dark:hover:text-[#959595] flex justify-center items-center px-4 rounded-md text-white"
              >
                <MdLogin size={20} />
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-x-5">
              <NotificationMenu user={user} />
              <ProfileMenu
                setDropdown={setDropdown}
                isTabletOrMobile={isTabletOrMobile}
                exit={exit}
                user={user}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
