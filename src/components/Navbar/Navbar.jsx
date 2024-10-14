import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/goalBoardTextDark.svg";
import { auth } from "~/firebase/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { logoutUser } from "~/redux/slices/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const exit = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      toast.success("Çıkış yapıldı");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="container mx-auto bg-white border py-4 rounded-full px-10 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-32" />
        </Link>
        <div className="flex gap-x-5 items-center">
          {!user ? (
            <div className="flex gap-x-1 items-center">
              <Skeleton className="px-4 py-2 rounded-full w-24 h-[36px]" />
            </div>
          ) : (
            <div className="flex gap-x-3 items-center">
              <Link
                to="/profile"
                className="font-medium text-sm bg-primary text-white  px-4 py-2 rounded-full"
              >
                Profilim
              </Link>
              <button
                onClick={exit}
                className="font-medium text-sm bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Çıkış Yap!
              </button>
            </div>
          )}
          {!user && (
            <div className="flex gap-x-5 items-center">
              <Link to="/about" className="font-medium text-sm">
                Hakkımızda
              </Link>
              <Link to="/contact" className="font-medium text-sm">
                İletişim
              </Link>
              <Link
                to="/register"
                className="font-medium text-sm bg-primary text-white px-4 py-2 rounded-full"
              >
                Başla!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
