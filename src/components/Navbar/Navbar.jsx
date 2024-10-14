import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "~/assets/Logo/SVG/goalBoardTextDark.svg";
import { auth } from "~/firebase/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { logoutUser } from "~/redux/slices/userSlice";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  const { user, status } = useSelector((state) => state.user);
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
          <img src={Logo} className="w-32" alt="GoalBoard Logo" />
        </Link>
        <div className="flex gap-x-5 items-center">
          {status === "pending" && (
            <div className="flex gap-x-1 items-center">
              <Skeleton className="px-4 py-2 rounded-full w-24 h-[36px]" />
            </div>
          )}

          {status === "success" && user && (
            <div className="flex gap-x-3 items-center">
              <Link
                to="/create-team"
                className="font-medium text-sm bg-primary text-white px-4 py-2 rounded-full"
              >
                Takım Oluştur
              </Link>

              <Link
                to="/profile"
                className="font-medium text-sm bg-primary text-white px-4 py-2 rounded-full"
              >
                Profilim
              </Link>
              <div className="relative">
                <button className="font-medium text-xl bg-white text-primary border border-primary px-4 py-2 rounded-full">
                  <IoIosNotifications />
                </button>
                <span className="w-4 h-4 bg-primary text-white -top-1 -right-1 absolute flex justify-center items-center rounded-full text-xs">
                  1
                </span>
              </div>
              <button
                onClick={exit}
                className="font-medium text-sm bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Çıkış Yap
              </button>
            </div>
          )}

          {status === "idle" && !user && (
            <div className="flex gap-x-5 items-center">
              <Link to="/about" className="font-medium text-sm">
                Hakkımızda
              </Link>
              <Link to="/contact" className="font-medium text-sm">
                İletişim
              </Link>
              <Link
                to="/login"
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
