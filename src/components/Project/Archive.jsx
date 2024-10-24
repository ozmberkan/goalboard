import React from "react";
import { IoArchiveOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import toast from "react-hot-toast";

const Archive = ({ projectID }) => {
  const { currentProject } = useSelector((store) => store.projects);
  const [animationParent] = useAutoAnimate();

  const dispatch = useDispatch();

  const cleanArchive = async () => {
    try {
      const projectsRef = doc(db, "projects", projectID);

      await updateDoc(projectsRef, {
        archiveTasks: [],
      });

      toast.success("Arşiv Temizlendi");
      dispatch(getProjectsByID(projectID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="w-full py-3 border-b mb-4 flex justify-between items-center">
        <h1 className="lg:text-xl text-lg font-semibold flex items-center gap-x-1">
          <IoArchiveOutline /> Proje Arşivi
        </h1>
        <div className="flex gap-x-2">
          <button
            onClick={cleanArchive}
            className="bg-red-100 text-red-500 border-red-400 border lg:px-4 lg:py-1 p-1 rounded-md flex items-center gap-x-2"
          >
            <span className="lg:flex hidden text-sm">Arşivi Temizle</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="w-full py-2 flex flex-col gap-5" ref={animationParent}>
          {currentProject?.archiveTasks?.length > 0 ? (
            currentProject?.archiveTasks?.map((archive) => (
              <div
                className={`bg-zinc-100 flex flex-col gap-2 items-center text-black rounded-xl w-full p-4 border`}
                key={archive.taskID}
              >
                <div className="w-full flex gap-x-2 ">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="font-medium flex items-center gap-x-1 text-zinc-700">
                      <span className="text-primary">{archive.text}</span> adlı
                      görev{" "}
                      {archive.createdAt.slice(0, 2) -
                        archive.archivedDate.slice(0, 2)}{" "}
                      günde tamamlandı!
                    </h1>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-zinc-100 p-4 rounded-md border border-zinc-200">
              <span>Henüz arşivde görev yok!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
