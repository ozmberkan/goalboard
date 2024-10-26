import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import toast from "react-hot-toast";
import { TbSettings } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Avatar from "~/assets/noavatar.png";
import { db } from "~/firebase/firebase";

const ProjectSettings = ({ projectID }) => {
  const { teamUsers } = useSelector((store) => store.user);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const deleteProject = async () => {
    try {
      const projectRef = doc(db, "projects", projectID);
      await deleteDoc(projectRef);
      toast.success("Proje başarıyla silindi.");
      setTimeout(() => {
        navigate(`/profile/${user.username}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <Tooltip id="my-tooltip" />
      <div className="w-full py-3 border-b mb-4">
        <h1 className="lg:text-xl text-lg font-semibold flex items-center gap-x-1">
          <TbSettings />
          Proje Ayarları
        </h1>
      </div>
      <div className="flex items-center gap-x-2 justify-start">
        <button
          onClick={deleteProject}
          className="px-4 py-2 rounded-md bg-red-500 text-white"
        >
          Projeyi Sil
        </button>
        <span className="flex items-center -space-x-5 lg:font-medium text-sm">
          {teamUsers.map((user) => (
            <img
              key={user.uid}
              src={user.photoURL ? user.photoURL : Avatar}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user.username}
              className="w-10 h-10 rounded-full object-cover border-4 border-zinc-100 shadow-lg"
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default ProjectSettings;
