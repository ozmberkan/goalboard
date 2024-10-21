import { FaEnvelope, FaHome, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpScheme } from "~/validation/scheme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUpService } from "~/redux/slices/userSlice";
import SignUpIcon from "~/assets/Auth/signup.svg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { SignUpInput } from "~/data/data";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpScheme),
  });

  const signUpHandle = async (data) => {
    try {
      dispatch(signUpService(data));
    } catch (error) {
      console.log("Hata: ", error.message);
    }
  };

  useEffect(() => {
    if (status === "failed") {
      toast.error("Kullanıcı adı veya şifre hatalı!");
    }
    if (status === "success") {
      toast.success("Başarıyla kayıt oldunuz!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [status]);

  return (
    <div className="flex-grow flex w-full ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white lg:flex hidden justify-center items-center border-r w-1/2"
      >
        <img src={SignUpIcon} className="drop-shadow-xl w-[700px]" />
        <Link
          to="/"
          className="absolute top-5 left-5 p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-300 rounded-md border"
        >
          <FaHome />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 bg-auth-bg bg-center bg-no-repeat bg-cover flex lg:justify-start py-24 justify-start items-center flex-col"
      >
        <Link
          to="/"
          className="absolute top-5 left-5 p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-300 rounded-md border lg:hidden"
        >
          <FaHome />
        </Link>
        <div className="lg:w-2/3  lg:h-[10rem] p-4 flex flex-col lg:items-start items-center justify-center gap-1 mb-5">
          <h1 className="font-extrabold text-[56px] text-primaryDark drop-shadow-md">
            Kayıt Ol
          </h1>
          <p className="font-bold text-zinc-700 text-lg w-full lg:text-left text-center ">
            Hemen ücretsiz bir hesap oluştur ve hedefine ulaşmak için ilk adımı
            at.
          </p>
        </div>
        <form
          className="lg:w-2/3 px-4 flex flex-col gap-y-4"
          onSubmit={handleSubmit(signUpHandle)}
        >
          {SignUpInput.map((input) => (
            <div
              key={input.id}
              className="bg-white drop-shadow-md pl-4 rounded-lg border flex items-center gap-x-4"
            >
              <span
                className={`text-primary ${
                  errors[input.name] && "text-red-500"
                }`}
              >
                <input.icon size={18} />
              </span>
              <input
                className="flex-1 h-12 outline-none rounded-lg"
                placeholder={input.placeholder}
                type={input.type}
                {...register(input.name)}
              />
            </div>
          ))}
          <div className="w-full  flex justify-between items-center">
            <Link
              to="/signin"
              className="lg:text-lg text-sm hover:underline font-medium  text-zinc-900"
            >
              Hesabın var mı ?
            </Link>
          </div>
          <button
            type="submit"
            className="lg:w-full h-12 py-2 rounded-lg bg-primaryDark hover:bg-primaryDark/85 text-white"
          >
            Kayıt Ol
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
