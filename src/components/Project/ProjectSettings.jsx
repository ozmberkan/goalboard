import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbSettings } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Avatar from "~/assets/noavatar.png";
import { db } from "~/firebase/firebase";
import ProjectInviteModal from "../UI/Modals/ProjectInviteModal";

const ProjectSettings = ({ projectID }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [isInviteModal, setIsInviteModal] = useState(false);
  const [projectUsers, setProjectUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getProjectUsers = async () => {
    setLoading(true);
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectMembers = projectSnap.data().projectMembers;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "in", projectMembers));

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjectUsers(users);
    } catch (error) {
      console.error("Error fetching project users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

  return (
    <>
      {isInviteModal && (
        <ProjectInviteModal
          setIsInviteModal={setIsInviteModal}
          projectID={projectID}
        />
      )}
      <div className="h-full">
        <Tooltip id="my-tooltip" />
        <div className="w-full py-3 border-b mb-4">
          <h1 className="lg:text-xl text-lg font-semibold flex items-center gap-x-1">
            <TbSettings />
            Proje Ayarları
          </h1>
        </div>
        <div className="flex items-center gap-x-2 justify-between">
          <div className="flex gap-x-2">
            <button
              onClick={deleteProject}
              className="px-4 py-2 rounded-md bg-red-500 text-white"
            >
              Projeyi Sil
            </button>
            <button
              onClick={() => setIsInviteModal(true)}
              className="px-4 py-2 rounded-md bg-primary text-white"
            >
              Projeye Davet Et
            </button>
          </div>
          {loading ? (
            <div className=" animate-pulse flex items-center -space-x-5 lg:font-medium text-sm">
              <div className="w-10 h-10  border-4 border-zinc-100 shadow-lg  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
            </div>
          ) : (
            <span className="flex items-center -space-x-5 lg:font-medium text-sm">
              {projectUsers.map((user) => (
                <img
                  key={user.uid}
                  src={user.photoURL ? user.photoURL : Avatar}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.username}
                  className="w-10 h-10 rounded-full object-cover border-4 border-zinc-100 shadow-lg"
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectSettings;
