import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "~/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { MdCloudUpload } from "react-icons/md";
import Spinner from "~/assets/spinner.svg";

const PhotoEditModal = ({ setIsEditPhoto }) => {
  const modalRoot = document.getElementById("modal");

  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((store) => store.user);

  const [uploading, setUploading] = useState(false);

  const handleUpdate = async (data) => {
    const file = data.photoURL[0];

    if (!file) {
      toast.error("Lütfen bir dosya seçiniz!");
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });

      toast.success("Profil fotoğrafı başarıyla güncellendi");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Fotoğraf yüklenemedi, lütfen tekrar deneyin.");
    } finally {
      setUploading(false);
      setUploadedPhotoURL(null);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsEditPhoto(false)}
        className="bg-zinc-900/50 p-8 fixed inset-0 z-50 grid place-items-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary  to-primaryDark p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative "
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-xl font-bold text-center mb-2 text-white">
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
              className="flex gap-2 py-4 border-t border-zinc-500 w-full"
              onSubmit={handleSubmit(handleUpdate)}
            >
              <label
                htmlFor="file"
                className="px-4 py-2 rounded-md bg-white cursor-pointer w-full text-zinc-700 hover:bg-zinc-100 text-center font-medium"
              >
                {uploading ? (
                  <span className="flex gap-x-4 items-center">
                    <img src={Spinner} className="w-5" alt="Loading..." />
                    Yükleniyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-x-4">
                    <MdCloudUpload />
                    Fotoğraf Yükle
                  </span>
                )}
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                placeholder="Profil Fotoğrafı URL"
                {...register("photoURL")}
                accept="image/*"
              />
              <button
                type="submit"
                className="lg:w-10 lg:h-10 flex justify-center items-center text-white"
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
