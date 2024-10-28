import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

const ProjectInviteModal = ({ setIsInviteModal, projectID }) => {
  const modalRoot = document.getElementById("modal");
  const { user } = useSelector((store) => store.user);
  const { register, handleSubmit } = useForm();

  const inviteUser = async (data) => {
    try {
      const { username } = data;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const projectRef = doc(db, "projects", projectID);

      const projectData = await getDoc(projectRef);

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnap) => {
          const userRef = doc(db, "users", docSnap.id);
          const userDoc = docSnap.data();

          const notifications = Array.isArray(userDoc.notification)
            ? userDoc.notification
            : [];

          await updateDoc(userRef, {
            notification: arrayUnion({
              from: user.username,
              message: `Sizi projeye davet ediyor.`,
              projectID: projectID,
              id: nanoid(),
            }),
          });
          toast.success("Davet gönderildi.");
          setIsInviteModal(false);
        });
      } else {
        toast.error("Kullanıcı bulunamadı.");
      }
    } catch (error) {
      toast.error("Davet gönderilirken bir hata oluştu: ", error);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsInviteModal(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary to-primaryDark dark:from-darkPrimary dark:to-darkBox  border border-transparent dark:border-darkBorder p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-xl font-bold text-center mb-2 text-white">
              Projeye Davet Et
            </h3>
            <p className="text-left ">
              <span className="flex items-center gap-x-3 w-full text-white">
                <FiAlertCircle size={25} />
                <span className="text-sm text-white">
                  Kullanıcı adı girerek projenize birini davet edebilirsiniz.
                </span>
              </span>
            </p>
            <form
              className="flex gap-2  py-4 border-t border-zinc-500 w-full"
              onSubmit={handleSubmit(inviteUser)}
            >
              <input
                className=" px-4 lg:w-full w-full py-2 rounded-md border text-sm outline-none text-black"
                placeholder="Kullanıcı Adı Giriniz.."
                {...register("username", { required: true })}
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

export default ProjectInviteModal;
