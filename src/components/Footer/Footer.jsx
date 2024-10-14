import React from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/DarkLogo.svg";
import { footerTabs } from "~/data/data";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 border-t w-full">
      <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-10" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 ">
            {footerTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.to}
                className="hover:underline me-4 md:me-6"
              >
                {tab.label}
              </Link>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 goalBoard™ . Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
