import { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa";
import CommentModal from "../UI/Modals/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdDeleteOutline, MdVerified } from "react-icons/md";

import Avatar from "~/assets/noavatar.png";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "~/firebase/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Comments = ({ projectID }) => {
  const [animationParent] = useAutoAnimate();

  const [IsCommentModal, setIsCommentModal] = useState(false);

  const { currentProject } = useSelector((store) => store.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsByID(projectID));
  }, []);

  const cleanComments = async () => {
    try {
      const projectsRef = doc(db, "projects", projectID);

      await updateDoc(projectsRef, {
        comments: [],
      });

      toast.success("Yorumlar Temizlendi");
      dispatch(getProjectsByID(projectID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="w-full py-3 border-b dark:border-darkBorder mb-4 flex justify-between items-center">
          <h1 className="lg:text-xl dark:text-darkText text-lg font-semibold flex items-center gap-x-1">
            <FaRegComments />
            Yorumlar
          </h1>
          <div className="flex gap-x-2">
            <button
              onClick={() => setIsCommentModal(true)}
              className="bg-green-100 text-green-500 dark:bg-green-500 dark:text-green-100 dark:border-darkBorder border-green-400 border lg:px-4 lg:py-1 p-1 rounded-md flex items-center gap-x-2"
            >
              <FaRegCommentDots size={20} />
              <span className="lg:flex hidden text-sm">Yeni Yorum Ekle</span>
            </button>
            <button
              onClick={cleanComments}
              className="bg-red-100 text-red-500 dark:bg-red-500 dark:text-red-100 dark:border-darkBorder border-red-400 border lg:px-4 lg:py-1 p-1 rounded-md flex items-center gap-x-2"
            >
              <MdDeleteOutline size={20} />
              <span className="lg:flex hidden text-sm">Yorumları Temizle</span>
            </button>
          </div>
        </div>
        <div className="w-full py-2 flex flex-col gap-5" ref={animationParent}>
          {currentProject?.comments.length > 0 ? (
            currentProject?.comments?.map((comment) => (
              <div
                className={`bg-zinc-100 dark:bg-darkBox flex flex-col items-center text-black rounded-xl w-full p-4 border dark:border-darkBorder`}
                key={comment.commentID}
              >
                <div className=" pb-2 w-full flex gap-x-2 border-b dark:border-darkBorder">
                  <img
                    src={comment.creatorImage ? comment?.creatorImage : Avatar}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold flex items-center gap-x-1 dark:text-white">
                      {comment.creatorName}{" "}
                      <span className="font-semibold text-primary flex items-center gap-x-2">
                        {comment.creatorPremium !== "silver" && (
                          <span
                            className={`${
                              comment.creatorPremium === "platinum" &&
                              "text-sky-500"
                            } ${
                              comment.creatorPremium === "gold" &&
                              "text-yellow-500"
                            }`}
                          >
                            <MdVerified size={15} />
                          </span>
                        )}
                      </span>
                    </h1>
                    <p className="text-xs text-gray-500">{comment.createdAt}</p>
                  </div>
                </div>
                <div className="text-sm font-medium w-full py-4 dark:text-white">
                  {comment.comment}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-zinc-100 dark:bg-darkBox  dark:border-darkBorder dark:text-darkText p-4 rounded-md border border-zinc-200">
              <span>Henüz yorum yapılmamış.</span>
            </div>
          )}
        </div>
      </div>

      {IsCommentModal && (
        <CommentModal
          setIsCommentModal={setIsCommentModal}
          projectID={projectID}
        />
      )}
    </>
  );
};

export default Comments;
