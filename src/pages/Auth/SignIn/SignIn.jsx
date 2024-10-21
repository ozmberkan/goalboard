import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaHome, FaLock } from "react-icons/fa";
import SignInIcon from "~/assets/Auth/signin.svg";
import { useForm } from "react-hook-form";
import { signInScheme } from "~/validation/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInService } from "~/redux/slices/userSlice";
import { motion } from "framer-motion";
import { SignInButtons, SignInInput } from "~/data/data";
import { useEffect } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInScheme),
  });

  const signInHandle = (data) => {
    try {
      dispatch(signInService(data));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (status === "failed") {
      toast.error("Kullanıcı adı veya şifre hatalı!");
    }
    if (status === "success") {
      toast.success("Başarıyla giriş yaptınız, yönleniyorsunuz...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [status]);

  return (
    <div className=" flex-grow flex w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white lg:flex hidden justify-center items-center border-r w-1/2"
      >
        <img src={SignInIcon} className="drop-shadow-xl w-[700px]" />
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
        <div className="lg:w-2/3 lg:h-[10rem]  p-4 flex flex-col lg:items-start items-center justify-center gap-1 mb-5 relative">
          <h1 className="font-extrabold text-[56px] text-primaryDark drop-shadow-md">
            Giriş Yap
          </h1>

          <p className="font-bold text-zinc-700 text-lg w-full lg:text-left text-center">
            Hemen giriş yap ve hedefine ulaşmak için ilk adımı at.
          </p>
        </div>

        <form
          className="lg:w-2/3 px-4 flex flex-col gap-y-6 "
          onSubmit={handleSubmit(signInHandle)}
        >
          {SignInInput.map((Input) => (
            <div
              key={Input.id}
              className="bg-white drop-shadow-md pl-4 rounded-lg border flex items-center gap-x-4"
            >
              <span
                className={`text-primary ${
                  errors[Input.name] && "text-red-500"
                }`}
              >
                <Input.icon size={18} />
              </span>
              <input
                className="flex-1 h-12 outline-none rounded-lg"
                placeholder={Input.placeholder}
                type={Input.type}
                {...register(Input.name)}
              />
            </div>
          ))}

          <div className="w-full  flex justify-between items-center gap-x-4">
            {SignInButtons.map((button) => (
              <Link
                key={button.id}
                to={button.to}
                className="lg:text-lg text-sm hover:underline font-medium  text-zinc-900"
              >
                {button.label}
              </Link>
            ))}
          </div>
          <button
            type="submit"
            className="w-full h-12 py-2 rounded-lg bg-primaryDark hover:bg-primaryDark/85 text-white"
          >
            Giriş Yap
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignIn;
