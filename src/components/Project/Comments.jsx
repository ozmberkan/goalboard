import { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa";
import CommentModal from "../UI/Modals/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

import Avatar from "~/assets/noavatar.png";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "~/firebase/firebase";

const Comments = ({ projectID }) => {
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
        <div className="w-full py-3 border-b mb-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold flex items-center gap-x-1">
            <FaRegComments />
            Yorumlar
          </h1>
          <div className="flex gap-x-2">
            <button
              onClick={() => setIsCommentModal(true)}
              className="bg-green-100 text-green-500 border-green-400 border px-4 py-2 rounded-md flex items-center gap-x-2"
            >
              <FaRegCommentDots size={20} />
              Yeni Yorum Ekle
            </button>
            <button
              onClick={cleanComments}
              className="bg-red-100 text-red-500 border-red-400 border px-4 py-2 rounded-md flex items-center gap-x-2"
            >
              <MdDeleteOutline size={20} />
              Yorumları Temizle
            </button>
          </div>
        </div>
        <div className="w-full py-2 flex flex-col gap-5">
          {currentProject?.comments.length > 0 ? (
            currentProject?.comments?.map((comment) => (
              <div
                className={`bg-zinc-100 flex flex-col items-center text-black rounded-xl w-full p-4 border`}
                key={comment.commentID}
              >
                <div className=" pb-2 w-full flex gap-x-2 border-b">
                  <img
                    src={comment.photoURL ? comment.photoURL : Avatar}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold">{comment.creatorName}</h1>
                    <p className="text-xs text-gray-500">{comment.createdAt}</p>
                  </div>
                </div>
                <div className="text-sm font-medium w-full py-4">
                  {comment.comment}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-zinc-100 p-4 rounded-md border border-zinc-200">
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
