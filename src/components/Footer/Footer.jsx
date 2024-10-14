import React from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/DarkLogo.svg";

const Footer = () => {
  return (
    <footer class="bg-white shadow dark:bg-gray-900 border-t w-full">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} class="h-10" />
          </Link>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 ">
            <Link to="/about" class="hover:underline me-4 md:me-6">
              Hakkımızda
            </Link>
            <Link to="/privacy-policy" class="hover:underline me-4 md:me-6">
              Gizlilik Politikası
            </Link>
            <Link to="/license" class="hover:underline me-4 md:me-6">
              Lisans
            </Link>
            <Link to="/contact" class="hover:underline">
              İletişim
            </Link>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 goalBoard™ . Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
