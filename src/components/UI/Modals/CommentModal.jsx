import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { nanoid } from "nanoid";

const CommentModal = ({ setIsCommentModal, projectID }) => {
  const modalroot = document.querySelector("#modal");

  const { handleSubmit, register, reset } = useForm();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const createComment = async (data) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const formattedDate = moment().format("DD.MM.YYYY HH:mm");

      const commentData = {
        createdAt: formattedDate,
        creatorID: user.uid,
        creatorName: user.username,
        creatorImage: user.photoURL,
        creatorPremium: user.premium,
        commentID: nanoid(),
        comment: data.comment,
      };

      await updateDoc(projectRef, {
        comments: arrayUnion(commentData),
      });
      toast.success("Yorumunuz başarıyla eklendi.");
      dispatch(getProjectsByID(projectID));
      reset();
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
        onClick={() => setIsCommentModal(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary to-primaryDark  p-6 rounded-lg w-full max-w-5xl shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-2xl font-bold text-center mb-2 text-white">
              Yeni Yorum Ekle
            </h3>
          </div>
          <form
            className="w-full  py-4  rounded-md flex flex-col gap-y-5"
            onSubmit={handleSubmit(createComment)}
          >
            <textarea
              className="min-h-32 max-h-44 w-full rounded-md border p-2 outline-none "
              placeholder="Mesajınız"
              {...register("comment", { required: true })}
            />
            <div className="w-full flex justify-start items-center gap-x-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-white text-black hover:bg-zinc-200"
              >
                Gönder
              </button>
              <button
                type="button"
                onClick={() => setIsCommentModal(false)}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Vazgeç
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalroot
  );
};

export default CommentModal;
