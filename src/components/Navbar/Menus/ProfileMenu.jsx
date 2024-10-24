import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaChevronDown, FaUser, FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profileTabs } from "~/data/data";
import Avatar from "~/assets/noavatar.png";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const ProfileMenu = ({ setDropdown, isTabletOrMobile, exit, user }) => {
  return (
    <Menu className="z-20">
      {({ open }) => (
        <>
          <MenuButton
            onClick={() => setDropdown(true)}
            className="lg:px-4 lg:py-1 py-2 px-4 flex items-center border-2 hover:bg-zinc-50 border-primary hover:border-primaryDark hover:text-primaryDark  rounded-md gap-x-2 transition-all duration-300   font-medium text-primary "
          >
            {isTabletOrMobile ? (
              <FaUser />
            ) : (
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={user?.photoURL ? user.photoURL : Avatar}
              />
            )}
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
                  <span>{user?.username}</span>
                  <span className="text-sm">{user?.email}</span>
                </div>
              </MenuItem>
              {profileTabs.map((tab) => (
                <MenuItem key={tab.id}>
                  <Link
                    to={
                      tab.to === "/profile"
                        ? `/profile/${user.username}`
                        : tab.to
                    }
                    className="hover:text-neutral-400"
                  >
                    <span className="flex items-center gap-x-2">
                      <tab.icon size={15} />
                      <span>{tab.label}</span>
                    </span>
                  </Link>
                </MenuItem>
              ))}

              {user.role === "admin" && (
                <MenuItem key="admin">
                  <Link
                    to="/admin"
                    className="hover:text-neutral-400 flex gap-x-2 items-center"
                  >
                    <FaUserLock size={15} />
                    Admin Paneli
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                <button
                  onClick={exit}
                  className="text-red-500 pt-4 border-t hover:text-red-400 flex items-center gap-x-2"
                >
                  <TbLayoutSidebarLeftCollapse />
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
