import { Link } from "react-router-dom";
import { navTabs, profileTabs } from "~/data/data";
import Logo from "~/assets/Logos/goalBoardTextDark.svg";
import { useState } from "react";
import Starter from "./children/Starter";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className="flex flex-col">
      <Starter />
      <div className="py-6 lg:px-14 px-5 border-b bg-white border-neutral-300 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-32" />
        </Link>

        {!user && (
          <>
            <div className="flex items-center gap-x-4">
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
            <div>
              <Link className="px-4 py-1 flex items-center gap-x-2 transition-all duration-300 rounded-md border-2 border-primary font-medium text-primary hover:bg-primary hover:border-transparent hover:text-white">
                Hemen Başla
              </Link>
            </div>
          </>
        )}

        {user && (
          <div className="flex items-center gap-x-5">
            <Menu>
              {({ open }) => (
                <>
                  <MenuButton
                    onClick={() => setDropdown(true)}
                    className="lg:px-4 lg:py-1 py-2 px-4 flex items-center gap-x-2 transition-all duration-300 rounded-md border-2 border-primary font-medium text-primary hover:bg-primary hover:border-transparent hover:text-white"
                  >
                    {isTabletOrMobile ? <FaUser /> : <span>Profilim</span>}{" "}
                    <FaChevronDown />
                  </MenuButton>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      anchor="bottom-end"
                      className="mt-2 p-5 bg-white rounded-md border border-neutral-300 shadow-lg flex flex-col gap-y-5"
                    >
                      <MenuItem className="border-b pb-3">
                        <div className="flex flex-col">
                          <span>M.Berkan Özmen</span>
                          <span className="text-sm">ozmberkan@gmail.com</span>
                        </div>
                      </MenuItem>
                      {profileTabs.map((tab) => (
                        <MenuItem key={tab.id}>
                          <Link to={tab.to} className="hover:text-neutral-400">
                            {tab.label}
                          </Link>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <button
                          onClick={() => setUser(false)}
                          className="text-red-500 pt-4 border-t hover:text-red-400 flex"
                        >
                          Çıkış Yap
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </>
              )}
            </Menu>

            <Menu>
              {({ open }) => (
                <>
                  <MenuButton className="p-2 relative text-sm rounded-full bg-primary border-2 border-transparent text-white hover:border-primary hover:bg-white hover:text-primary">
                    <FaBell />
                    <span className="bg-primaryDark absolute -top-2.5 -right-2 text-white px-2 py-0.5 text-xs flex justify-center items-center rounded-full">
                      2
                    </span>
                  </MenuButton>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems anchor="bottom end">
                      <MenuItem className="mt-2 p-5 bg-white rounded-md border border-neutral-300 shadow-lg flex flex-col gap-y-5">
                        <div>
                          <span className="text-sm font-medium pb-2 border-b">
                            Bildirimler
                          </span>
                          <div className="flex flex-col  gap-y-3">
                            <p className="text-sm text-neutral-400">
                              <Link
                                to="/users/Aniltrr"
                                className="font-medium text-primary"
                              >
                                @Anıltrr{" "}
                              </Link>
                              sizi takıma davet ediyor.
                            </p>
                            <p className="text-sm text-neutral-400">
                              <Link
                                to="/users/Aniltrr"
                                className="font-medium text-primary"
                              >
                                @Anıltrr{" "}
                              </Link>
                              sizi takıma davet ediyor.
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
