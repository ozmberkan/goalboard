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
import { FiSettings, FiTrash, FiUsers } from "react-icons/fi";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FaUsers } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

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
        <div className="flex items-center gap-x-2 justify-between border p-3 rounded-xl bg-zinc-100">
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
                  className="lg:w-14 lg:h-14 w-10 h-10 rounded-full object-cover border-4 border-zinc-100 shadow-lg"
                />
              ))}
            </span>
          )}
          <Popover className="relative">
            <PopoverButton className="lg:p-4 p-2 hover:bg-zinc-50 rounded-full lg:text-3xl text-lg">
              <FiSettings />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              className="flex flex-col border p-4 gap-y-5 mt-1 rounded-md bg-white shadow-lg"
            >
              <div className="flex flex-col gap-y-2">
                <button
                  onClick={() => setIsInviteModal(true)}
                  className="lg:px-4 lg:py-2 px-2 py-1 text-sm  rounded-md text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border  transition-colors duration-300 flex items-center gap-x-2"
                >
                  <FiUsers />
                  <span className="lg:flex ">Projeye Davet Et</span>
                </button>

                <button
                  onClick={deleteProject}
                  className="lg:px-4 lg:py-2 px-2 py-1  text-sm rounded-md  text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border transition-colors duration-300 flex items-center gap-x-2"
                >
                  <FiTrash className="text-red-500" />
                  <span className="lg:flex  text-red-500">Projeyi Sil</span>
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <div>{/* Kullanıcılara Rol Verme */}</div>
      </div>
    </>
  );
};

export default ProjectSettings;
