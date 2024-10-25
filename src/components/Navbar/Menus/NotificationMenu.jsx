import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotificationMenu = ({ user }) => {
  return (
    <Menu className="z-20">
      {({ open }) => (
        <>
          <MenuButton className="p-2 relative  lg:text-lg text-sm rounded-full bg-primary border-2 border-transparent text-white hover:border-primary hover:bg-white hover:text-primary">
            <FaBell />
            <span className="bg-primaryDark absolute -top-2.5 -right-2 text-white px-2 py-0.5 text-xs flex justify-center items-center rounded-full">
              {user?.notification?.length}
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
            <MenuItems anchor="bottom">
              <MenuItem className="mt-2 lg:p-5 p-3 bg-white rounded-md border border-neutral-300 shadow-lg flex flex-col gap-y-5">
                <div>
                  <span className="text-sm font-medium pb-2 border-b">
                    Bildirimler
                  </span>
                  <div className="flex flex-col  gap-y-3">
                    {user?.notification?.length > 0 ? (
                      user?.notification?.map((notification, index) => (
                        <Link
                          to="/invites"
                          key={index}
                          className="text-sm text-neutral-400"
                        >
                          <span className="font-medium text-primary">
                            @{notification.from}{" "}
                          </span>
                          {notification.message}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-neutral-400">
                        Bildirim kutusu boş
                      </p>
                    )}
                  </div>
                </div>
              </MenuItem>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default NotificationMenu;
