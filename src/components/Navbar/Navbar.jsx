import { Link } from "react-router-dom";
import { navTabs } from "~/data/data";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import ProfileMenu from "./Menus/ProfileMenu";
import NotificationMenu from "./Menus/NotificationMenu";
import MobileMenu from "./Menus/MobileMenu";
import Starter from "./children/Starter";
import Logo from "~/assets/Logos/goalBoardTextDark.svg";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [dropdown, setDropdown] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const exit = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
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

        {!user && isTabletOrMobile && <MobileMenu setDropdown={setDropdown} />}

        {user && (
          <div className="flex items-center gap-x-5">
            <ProfileMenu
              setDropdown={setDropdown}
              isTabletOrMobile={isTabletOrMobile}
              exit={exit}
              user={user}
            />
            <NotificationMenu user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
