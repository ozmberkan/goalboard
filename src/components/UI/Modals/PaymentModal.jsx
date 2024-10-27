import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ setIsPaymentModal }) => {
  const modalRoot = document.getElementById("modal");

  const { selectedPaymentType, user } = useSelector((store) => store.user);

  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        premium: selectedPaymentType.label,
      });
      toast.success("Ödeme başarılı, premium üyeliğiniz aktif edildi.");
      setIsPaymentModal(false);

      setTimeout(() => {
        navigate(`/profile/${user.username}`);
      }, 2000);
    } catch (error) {
      toast.error("Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPaymentModal(false)}
        className="bg-zinc-900/50 fixed inset-0 z-50 flex justify-end p-6"
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-darkPrimary text-zinc-700 p-6 rounded-lg w-full max-w-md h-full shadow-xl cursor-default relative overflow-auto "
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-semibold text-xl dark:text-neutral-400">
                Ödeme Detayları
              </h1>
              <button
                onClick={() => setIsPaymentModal(false)}
                className="p-2 bg-zinc-100 dark:bg-darkBox dark:border dark:border-darkBorder rounded-md"
              >
                <MdCancel size={20} />
              </button>
            </div>
            <div className="w-full flex mt-4 h-full gap-4 flex-col ">
              <div className="w-full rounded bg-zinc-50 dark:bg-darkBox dark:border-darkBorder border p-5 flex justify-between items-center gap-5">
                <div className="flex items-center gap-x-2">
                  <img
                    src={user?.photoURL ? user?.photoURL : Avatar}
                    className="w-10 h-10 rounded-full object-cover lg:block hidden"
                  />
                  <span className="text-sm dark:text-darkText">
                    {user?.email}
                  </span>
                </div>
                <div className="text-sm dark:text-darkText">
                  {moment().format("DD.MM.YYYY")}
                </div>
              </div>
              <div className="w-full rounded-xl bg-zinc-50 dark:bg-darkBox dark:border-darkBorder dark:rounded border p-5  gap-5 h-full flex flex-col">
                <div className="flex w-full justify-between items-center">
                  <div className="text-3xl">
                    {selectedPaymentType.label === "Platinum" && (
                      <span className="bg-clip-text font-bold text-transparent bg-gradient-to-tr from-sky-700 to-slate-300">
                        Platinium Paket
                      </span>
                    )}
                    {selectedPaymentType.label === "Gold" && (
                      <span className="bg-clip-text font-bold text-transparent bg-gradient-to-tr from-yellow-400 to-yellow-700">
                        Gold Paket
                      </span>
                    )}
                  </div>
                  <div className="text-2xl text-zinc-700 dark:text-darkText font-semibold">
                    {selectedPaymentType.price}/ay
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    className={`lg:p-20 p-5 ${
                      selectedPaymentType.label === "Gold"
                        ? "bg-card-gold-bg"
                        : "bg-card-bg"
                    } w-full bg-card-bg bg-cover bg-no-repeat bg-center rounded-md relative dark:border-darkBorder text-white shadow-xl border  transition-transform `}
                  >
                    <div className="w-full p-5 lg:absolute lg:block left-0 top-0 hidden">
                      <div className="pt-1">
                        <p className="font-light">Kart Numarası</p>
                        <p className="font-medium tracking-more-wider">
                          {cardNumber
                            ? cardNumber.replace(/(.{4})/g, "$1 ")
                            : "**** **** **** ****"}
                        </p>
                      </div>
                      <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                          <div className="">
                            <p className="font-light text-xs">Geçerlilik</p>
                            <p className="font-medium tracking-wider text-sm">
                              {cardDate ? cardDate : "MM/YY"}
                            </p>
                          </div>
                          <div className="">
                            <p className="font-light text-xs">CVV</p>
                            <p className="font-bold tracking-more-wider text-sm">
                              {cardCvv ? cardCvv : "***"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Kart Üzerindeki İsim"
                      className="p-2 rounded-md border outline-none dark:bg-transparent dark:border-darkBorder "
                    />
                    <input
                      type="text"
                      placeholder="Kart Numarası"
                      className="p-2 rounded-md border outline-none dark:bg-transparent dark:border-darkBorder "
                      value={cardNumber}
                      maxLength={16}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="p-2 rounded-md border outline-none dark:bg-transparent dark:border-darkBorder "
                      value={cardDate}
                      maxLength={5}
                      onChange={(e) => setCardDate(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="p-2 rounded-md border outline-none dark:bg-transparent dark:border-darkBorder "
                      value={cardCvv}
                      maxLength={3}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="p-2 bg-primary text-white rounded-md hover:bg-primaryDark dark:hover:bg-darkPrimary transition-colors duration-300"
                    >
                      Ödeme Yap
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default PaymentModal;
