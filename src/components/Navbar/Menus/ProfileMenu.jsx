import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profileTabs } from "~/data/data";

const ProfileMenu = ({ setDropdown, isTabletOrMobile, setUser }) => {
  return (
    <Menu className="z-20">
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
  );
};

export default ProfileMenu;
