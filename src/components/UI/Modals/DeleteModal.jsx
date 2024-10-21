import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const DeleteModal = ({ setIsDelete, setConfirm }) => {
  const modalroot = document.querySelector("#modal");

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsDelete(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary to-primaryDark  p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-2xl font-bold text-center mb-2 text-white">
              Dikkat
            </h3>
            <p className="text-left ">
              <span className="flex items-center gap-x-3 w-full text-white">
                <FiAlertCircle size={25} />
                <span className="text-sm text-white">
                  Takımı silmek istediğinize emin misiniz?
                </span>
              </span>
            </p>
            <div className="w-full flex gap-x-4 mt-3">
              <button
                onClick={() => setConfirm(true)}
                className="bg-zinc-50 text-primary px-4 py-1 rounded-md flex items-center gap-x-2"
              >
                <span className="text-base">Eminim</span>
              </button>
              <button
                onClick={() => setIsDelete(false)}
                className="bg-zinc-50 text-red-500 px-4 py-1 rounded-md flex items-center gap-x-2"
              >
                <span className="text-base">Vazgeç</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalroot
  );
};

export default DeleteModal;
