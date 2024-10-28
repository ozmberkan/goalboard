import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { adminUserInputs } from "~/data/data";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllUserForAdmin } from "~/redux/slices/userSlice";

const AdminUserEditModal = ({ setIsEditMode, selectedUser }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: selectedUser.role,
      username: selectedUser.username,
      email: selectedUser.email,
      photoURL: selectedUser.photoURL,
    },
  });

  const changeUserProfile = async (data) => {
    try {
      const userRef = doc(db, "users", selectedUser.uid);

      await updateDoc(userRef, {
        role: data.role,
        username: data.username,
        email: data.email,
        photoURL: data.photoURL,
      });

      toast.success("Kullanıcı başarıyla güncellendi.");
      setIsEditMode(false);
      dispatch(getAllUserForAdmin());
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsEditMode(false)}
        className="bg-zinc-900/50 fixed inset-0 z-50 flex justify-end p-6"
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-darkPrimary text-zinc-700 p-6 rounded-lg w-full max-w-md h-full shadow-xl cursor-default relative overflow-auto"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-semibold text-xl dark:text-darkText">
                Kullanıcı Güncelle
              </h1>
              <button
                onClick={() => setIsEditMode(false)}
                className="p-2 bg-zinc-100 dark:bg-darkBox dark:text-darkText dark:hover:text-neutral-400 rounded-md"
              >
                <MdCancel size={20} />
              </button>
            </div>
            <div className="w-full flex mt-4 h-full gap-4 flex-col">
              <form
                className="w-full rounded-xl bg-zinc-50 dark:bg-darkBox dark:border-darkBorder border p-5 flex flex-col gap-y-5 items-center"
                onSubmit={handleSubmit(changeUserProfile)}
              >
                {adminUserInputs.map((input, i) => (
                  <div key={i} className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-zinc-700">
                      {input.label}
                    </label>
                    {input.type === "select" ? (
                      <select
                        className="w-full px-4 py-2 rounded-md border dark:bg-transparent dark:text-darkText dark:border-darkBorder"
                        {...register(input.name)}
                        defaultValue={selectedUser.role}
                      >
                        <option value="admin">Yetkili</option>
                        <option value="user">Kullanıcı</option>
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        className="w-full px-4 py-2 rounded-md border outline-none dark:bg-transparent dark:text-darkText dark:border-darkBorder"
                        {...register(input.name)}
                        defaultValue={selectedUser[input.name]}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-white w-full"
                >
                  Kaydet
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default AdminUserEditModal;
