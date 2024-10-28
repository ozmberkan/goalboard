import { Link } from "react-router-dom";
import {
  FooterContacts,
  FooterQuickLinks,
  FooterSocialTabs,
} from "~/data/data";
import { useSelector } from "react-redux";
import ForLightLogo from "~/assets/Logos/goalBoardTextDark.svg";
import ForDarkLogo from "~/assets/Logos/goalBoardTextLight.svg";

const Footer = () => {
  const { theme } = useSelector((store) => store.theme);

  return (
    <footer className="bg-white dark:bg-darkPrimary dark:border-darkBorder border-t text-gray-600 dark:text-darkText  w-full transition-all duration-500 ">
      <div className=" max-w-6xl mx-auto ">
        <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-12 p-12">
          <div className="flex flex-col gap-y-3 items-start justify-start">
            <img
              src={theme === "dark" ? ForDarkLogo : ForLightLogo}
              className="w-32"
            />
            <p className="mb-4">
              Hedeflerinizi gerçekleştirmenize yardımcı oluyoruz.
            </p>
            <div className="flex space-x-4">
              {FooterSocialTabs.map((tab) => (
                <Link
                  key={tab.id}
                  to="#"
                  className="hover:text-primary hover:scale-125 transform transition-all duration-300"
                >
                  <tab.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-neutral-400 mb-4">
              Hızlı Bağlantılar
            </h3>
            <div className="space-y-2 flex flex-col">
              {FooterQuickLinks.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.to}
                  className="hover:text-zinc-400 dark:hover-neutral-400 "
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-neutral-400 hover mb-4">
              İletişim
            </h3>
            {FooterContacts.map((tab) => (
              <p key={tab.id}>{tab.label}</p>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-neutral-400 mb-4">
              Premium Sahibi Olun
            </h3>
            <p className="mb-4">
              Daha fazla özellik ve daha fazla proje oluşturmak için premium üye
              olun.
            </p>
            <Link
              to="/pricing"
              className="bg-primary dark:hover:bg-darkPrimary dark:border-darkBorder border border-transparent dark:hover:text-darkText hover:bg-primaryDark transition-colors duration-300 text-white px-4 py-1 rounded-md"
            >
              Premium
            </Link>
          </div>
        </div>
        <div className="border-t px-12 border-zinc-400 dark:border-darkBorder  py-4 text-sm text-center flex justify-between items-center">
          <p>&copy; 2024 goalBoard. Tüm hakları saklıdır.</p>
          <p>v1.5</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
