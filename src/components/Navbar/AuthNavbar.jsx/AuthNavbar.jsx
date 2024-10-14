import { Link, NavLink } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/goalBoardTextDark.svg";

const AuthNavbar = () => {
  return (
    <div className="w-full p-4">
      <div className="container mx-auto bg-white border py-4 rounded-full px-10 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-32" />
        </Link>
        <div className="flex gap-x-1 items-center">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "bg-primary text-white px-4 py-2 rounded-full text-sm"
                : "bg-white text-black px-4 py-2 rounded-full text-sm"
            }
          >
            Kayıt Ol
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-primary text-white px-4 py-2 rounded-full text-sm"
                : "bg-white text-black px-4 py-2 rounded-full text-sm"
            }
          >
            Giriş Yap
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
