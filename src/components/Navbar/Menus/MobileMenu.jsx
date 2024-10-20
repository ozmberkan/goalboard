import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { navTabs } from "~/data/data";

const MobileMenu = ({ setDropdown }) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton
            onClick={() => setDropdown(true)}
            className="lg:px-4 lg:py-1 py-2 px-4 flex items-center gap-x-2 transition-all duration-300 rounded-md border-2 border-primary font-medium text-primary hover:bg-primary hover:border-transparent hover:text-white"
          >
            <TiThMenu />
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
              {navTabs.map((tab) => (
                <MenuItem key={tab.id}>
                  <Link
                    to={tab.to}
                    className="hover:text-neutral-400 text-neutral-500"
                  >
                    {tab.label}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default MobileMenu;
