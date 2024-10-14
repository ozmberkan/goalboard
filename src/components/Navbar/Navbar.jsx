import { Link } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/goalBoardTextDark.svg";

const Navbar = () => {
  return (
    <div className=" w-full p-4">
      <div className="container mx-auto  bg-white border py-4 rounded-full px-10  flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-32" />
        </Link>
        <div className="flex gap-x-5 items-center">
          <Link
            to="/register"
            className={`font-medium text-sm bg-base text-white px-4 py-2 rounded-full
            `}
          >
            Başla!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
