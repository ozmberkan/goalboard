import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import ForgotIcon from "~/assets/Auth/forgot.svg";

const ForgotPassword = () => {
  return (
    <div className="flex-grow flex w-full ">
      <div className="bg-white lg:flex hidden justify-center items-center border-r w-1/2">
        <img src={ForgotIcon} className="drop-shadow-xl w-[700px]" />
      </div>
      <div className="lg:w-1/2  w-full bg-auth-bg bg-center bg-no-repeat bg-cover flex lg:justify-center justify-start items-center flex-col">
        <div className="lg:w-2/3  lg:h-[10rem] p-4 flex flex-col lg:items-start items-center justify-center gap-1 mb-5">
          <h1 className="font-extrabold lg:text-[56px] text-[45px] text-primaryDark drop-shadow-md text-center lg:text-left">
            Şifremi Unuttum
          </h1>
          <p className="font-bold text-zinc-700 text-lg w-full lg:text-left text-center ">
            Hemen ücretsiz bir hesap oluştur ve hedefine ulaşmak için ilk adımı
            at.
          </p>
        </div>
        <form className="lg:w-2/3 px-4 flex flex-col gap-y-4 ">
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

          <div className="w-full  flex justify-between items-center">
            <Link
              to="/signin"
              className="lg:text-lg underline font-medium hover:text-zinc-700 text-zinc-900"
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
