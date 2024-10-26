import React, { useState } from "react";
import Bubble from "~/assets/Bubble.svg";
import PricingCard from "./children/PricingCard";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pricingCards } from "~/data/data";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "~/components/UI/Modals/PaymentModal";
import { setSelectedPaymentType } from "~/redux/slices/userSlice";

const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsPaymentModal, setIsPaymentModal] = useState(false);
  const { user } = useSelector((store) => store.user);

  const selectType = (card) => {
    if (card.label === "Silver") {
      toast.error(
        "Bu pakete zaten sahipsiniz. Lütfen başka bir paket seçiniz."
      );
      return;
    }

    if (!user) {
      toast.error("Lütfen giriş yapınız.");
      return;
    } else {
      setIsPaymentModal(true);
    }
    const { id, features, ...rest } = card;
    dispatch(setSelectedPaymentType(rest));
  };

  return (
    <>
      <Toaster />
      {IsPaymentModal && <PaymentModal setIsPaymentModal={setIsPaymentModal} />}
      <div className="flex-grow flex items-center justify-start flex-col relative p-12 lg:p-20 lg:gap-y-5 gap-y-12">
        <Link
          to="/"
          className="absolute top-6 left-6 p-3 bg-white border rounded-md text-2xl text-zinc-500 z-10 hover:text-zinc-700"
        >
          <MdCancel />
        </Link>
        <img src={Bubble} className="absolute top-0 -z-10 lg:w-auto w-full" />
        <div className="flex flex-col gap-y-3 items-center justify-center z-10 lg:mt-0 mt-12">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[56px] font-extrabold bg-gradient-to-tr text-transparent bg-clip-text from-primary to-primaryDark"
          >
            Premium'a Katıl!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-medium text-zinc-700 flex flex-col"
          >
            Premium üyeliğe sahip olarak daha fazla özellikten yararlanın.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 1 }}
          className=" w-full lg:flex lg:justify-center lg:items-center grid grid-cols-1 gap-6 mt-7 "
        >
          {pricingCards.map((card) => (
            <PricingCard key={card.id} card={card} selectType={selectType} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Pricing;
