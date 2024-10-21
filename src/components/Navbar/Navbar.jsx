import { Link } from "react-router-dom";
import { navTabs } from "~/data/data";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { RiFunctionAddFill } from "react-icons/ri";

import ProfileMenu from "./Menus/ProfileMenu";
import NotificationMenu from "./Menus/NotificationMenu";
import MobileMenu from "./Menus/MobileMenu";
import Starter from "./children/Starter";
import Logo from "~/assets/Logos/goalBoardTextDark.svg";
import TeamModal from "../UI/Modals/TeamModal";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [dropdown, setDropdown] = useState(false);
  const [isTeamModal, setIsTeamModal] = useState(false);
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
        <div className="py-6 lg:px-14 px-5 border-b bg-white border-neutral-300 flex justify-between items-center">
          <Link to="/">
            <img src={Logo} className="w-32" />
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
                    className="px-4 py-1 flex items-center gap-x-2 transition-all duration-300 rounded-md border-2 border-primary font-medium text-primary hover:bg-primary hover:border-transparent hover:text-white"
                  >
                    Hemen Başla
                  </Link>
                </>
              )}
            </>
          )}

          {!user && isTabletOrMobile && (
            <MobileMenu setDropdown={setDropdown} />
          )}

          {user && (
            <div className="flex items-center gap-x-5">
              <button
                onClick={() => setIsTeamModal(true)}
                className="p-2  relative  lg:text-xl text-sm rounded-full bg-primary border-2 border-transparent text-white hover:border-primary hover:bg-white hover:text-primary"
              >
                <RiFunctionAddFill />
              </button>
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
      {isTeamModal && <TeamModal setIsTeamModal={setIsTeamModal} />}
    </>
  );
};

export default Navbar;
