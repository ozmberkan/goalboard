import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import SignInIcon from "~/assets/Auth/SignIn.svg";

const SignIn = () => {
  return (
    <div className=" flex-grow flex w-full">
      <div className="bg-white lg:flex hidden justify-center items-center border-r w-1/2">
        <img src={SignInIcon} className="drop-shadow-xl w-[700px]" />
      </div>
      <div className="lg:w-1/2 bg-auth-bg bg-center bg-no-repeat bg-cover flex lg:justify-center justify-start items-center flex-col">
        <div className="lg:w-2/3 lg:h-[10rem]  p-4 flex flex-col lg:items-start items-center justify-center gap-1 mb-5">
          <h1 className="font-extrabold text-[56px] text-primaryDark drop-shadow-md">
            Giriş Yap
          </h1>
          <p className="font-bold text-zinc-700 text-lg w-full lg:text-left text-center">
            Hemen giriş yap ve hedefine ulaşmak için ilk adımı at.
          </p>
        </div>
        <form className="lg:w-2/3 px-4 flex flex-col gap-y-6 ">
          <div className="bg-white drop-shadow-md pl-4 rounded-lg border flex items-center gap-x-4">
            <span className="text-primary">
              <FaEnvelope size={18} />
            </span>
            <input
              className="flex-1 h-12 outline-none rounded-lg"
              placeholder="E-Posta Giriniz.."
              type="email"
            />
          </div>
          <div className="bg-white drop-shadow-md pl-4 rounded-lg border flex items-center gap-x-4">
            <span className="text-primary">
              <FaLock size={18} />
            </span>
            <input
              className="flex-1 h-12 outline-none rounded-lg"
              placeholder="Parola Giriniz.."
              type="password"
            />
          </div>
          <div className="w-full  flex justify-between items-center">
            <Link
              to="/signup"
              className="lg:text-lg underline font-medium hover:text-zinc-700 text-zinc-900"
            >
              Hesabın yok mu?
            </Link>
            <Link
              to="/forgot-password"
              className="lg:text-lg underline font-medium hover:text-zinc-700 text-zinc-900"
            >
              Parolamı Unuttum
            </Link>
          </div>
          <button
            type="submit"
            className="w-full h-12 py-2 rounded-lg bg-primaryDark hover:bg-primaryDark/85 text-white"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
