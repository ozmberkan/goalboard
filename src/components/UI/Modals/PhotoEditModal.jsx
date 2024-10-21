import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserByID } from "~/redux/slices/userSlice";

const PhotoEditModal = ({ setIsEditPhoto }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { user } = useSelector((store) => store.user);

  const updateProfilePhoto = async (data) => {
    try {
      console.log(data);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        photoURL: data.photoURL,
      });
      toast.success("Profil fotoğrafı başarıyla güncellendi.");
      dispatch(getUserByID(user.uid));
    } catch (error) {
      toast.error(error);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsEditPhoto(false)}
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
            <h3 className="text-3xl font-bold text-center mb-2 text-white">
              Profil Fotoğrafı Düzenle
            </h3>
            <p className="text-left ">
              <span className="flex items-center gap-x-3 w-full text-white">
                <FiAlertCircle size={25} />
                <span className="text-sm text-white">
                  Profil fotoğrafınızı düzenlemek için lütfen yeni bir fotoğraf
                  yükleyin.
                </span>
              </span>
            </p>
            <form
              className="flex gap-2  py-4 border-t border-zinc-500 w-full"
              onSubmit={handleSubmit(updateProfilePhoto)}
            >
              <input
                className="flex-1 px-4 py-2 rounded-md border text-sm outline-none text-black"
                placeholder="Profil Fotoğrafı URL"
                {...register("photoURL", { required: true })}
              />
              <button
                type="submit"
                className="w-10 h-10 flex justify-center items-center text-white"
              >
                <IoMdAddCircle size={30} />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default PhotoEditModal;
