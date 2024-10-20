import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ForgotIcon from "~/assets/Auth/forgot.svg";
import { forgotService } from "~/redux/slices/userSlice";
import { forgotScheme } from "~/validation/scheme";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotScheme),
  });

  const forgotHandle = (data) => {
    try {
      dispatch(forgotService(data));
      toast.success(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
      );
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex-grow flex w-full ">
      <div className="bg-white lg:flex hidden justify-center items-center border-r w-1/2">
        <img src={ForgotIcon} className="drop-shadow-xl w-[700px]" />
        <Link
          to="/"
          className="absolute top-5 left-5 p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-300 rounded-md border"
        >
          <FaHome />
        </Link>
      </div>
      <div className="lg:w-1/2 bg-auth-bg bg-center bg-no-repeat bg-cover flex lg:justify-start py-24 justify-start items-center flex-col">
        <div className="lg:w-2/3  lg:h-[10rem] p-4 flex flex-col lg:items-start items-center justify-center gap-1 mb-5">
          <h1 className="font-extrabold lg:text-[56px] text-[45px] text-primaryDark drop-shadow-md text-center lg:text-left">
            Parolamı Unuttum
          </h1>
          <p className="font-bold text-zinc-700 text-lg w-full lg:text-left text-center ">
            Hemen ücretsiz bir hesap oluştur ve hedefine ulaşmak için ilk adımı
            at.
          </p>
        </div>
        <form
          className="lg:w-2/3 px-4 flex flex-col gap-y-4"
          onSubmit={handleSubmit(forgotHandle)}
        >
          <div className="bg-white drop-shadow-md pl-4 rounded-lg border flex items-center gap-x-4">
            <span className={`text-primary ${errors.email && "text-red-500"}`}>
              <FaEnvelope size={18} />
            </span>
            <input
              className="flex-1 h-12 outline-none rounded-lg"
              placeholder="E-Posta Giriniz.."
              type="email"
              {...register("email")}
            />
          </div>

          <div className="w-full  flex justify-between items-center">
            <Link
              to="/signin"
              className="lg:text-lg hover:underline font-medium  text-zinc-900"
            >
              Parolanı hatırlıyor musun ?
            </Link>
          </div>
          <button
            type="submit"
            className="lg:w-full h-12 py-2 rounded-lg bg-primaryDark hover:bg-primaryDark/85 text-white"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
