import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/goalBoardTextDark.svg";

const AuthNavbar = () => {
  const { user } = useSelector((state) => state.user);

  // URL'nin tam yolunu almak için useLocation hook'unu kullanıyoruz
  const location = useLocation();

  // URL yolunu kontrol ederek buton metnini dinamik olarak değiştiriyoruz
  const buttonText = location.pathname.includes("login")
    ? "Kayıt Ol"
    : location.pathname.includes("register")
    ? "Giriş Yap"
    : "Başla!";

  return (
    <div className="w-full p-4">
      <div className="container mx-auto bg-white border py-4 rounded-full px-10 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-32" />
        </Link>
        <div className="flex gap-x-1 items-center">
          <Link
            to="/"
            className="font-medium text-sm bg-base text-white px-4 py-2 rounded-full"
          >
            Anasayfa
          </Link>

          <Link
            to={
              location && location.pathname.includes("login")
                ? "/register"
                : "/login"
            }
            className="font-medium text-sm text-black px-4 py-2 rounded-full"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
