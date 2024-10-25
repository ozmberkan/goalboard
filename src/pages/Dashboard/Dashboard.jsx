import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProjectModal from "~/components/UI/Modals/ProjectModal";
import InviteModal from "~/components/UI/Modals/InviteModal";
import ProjectBox from "~/components/Project/ProjectBox";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "~/firebase/firebase";
import { getTeamByID } from "~/redux/slices/teamsSlice";
import { ripples } from "ldrs";
import { FaRegTrashAlt, FaTrash, FaUsers } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getAllProjects } from "~/redux/slices/projectsSlice";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TbCircleArrowDownLeftFilled } from "react-icons/tb";

const Dashboard = () => {
  const { teamID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animationParent] = useAutoAnimate();
  const { user } = useSelector((store) => store.user);
  const { currentTeam, status } = useSelector((store) => store.teams);
  const { projects } = useSelector((store) => store.projects);
  const [isInviteModal, setIsInviteModal] = useState(false);

  const [isProjectModal, setIsProjectModal] = useState(false);

  ripples.register();

  useEffect(() => {
    if (teamID) {
      dispatch(getTeamByID(teamID));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProjects(teamID));
  }, []);

  const deleteTeam = async (teamID) => {
    try {
      const teamsRef = doc(db, "teams", teamID);
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(teamsRef);

      await updateDoc(userRef, {
        teams: arrayRemove(teamID),
      });
      toast.success("Takım başarıyla silindi!");
      setTimeout(() => {
        navigate(`/profile/${user.username}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveTeam = async (uid) => {
    try {
      const teamRef = doc(db, "teams", teamID);
      const userRef = doc(db, "users", uid);

      await updateDoc(teamRef, {
        members: arrayRemove(uid),
      });

      await updateDoc(userRef, {
        teams: arrayRemove(teamID),
      });

      toast.success("Takımdan ayrıldınız.");
      setTimeout(() => {
        navigate(`/profile/${user.username}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white ">
        <l-ripples size="150" speed="2" color="#3A5ADB"></l-ripples>
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow p-4 flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden"
        >
          <div className="w-full justify-between items-center flex ">
            <h1 className="font-semibold lg:text-4xl text-lg text-primary">
              {currentTeam?.teamName}
            </h1>
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center gap-x-2 bg-zinc-50 lg:px-4 lg:py-2 px-2 py-1 border rounded-md">
                <span className="flex items-center gap-x-2 lg:font-medium text-sm">
                  <FaUsers size={17} />
                  {currentTeam?.members?.length}
                </span>
              </div>
              <button
                onClick={() => leaveTeam(user.uid)}
                className="lg:px-4 lg:py-2 px-2 py-1 text-sm  rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 flex items-center gap-x-1"
              >
                <TbCircleArrowDownLeftFilled size={18} />
                <span className="lg:flex hidden">Takımdan Ayrıl</span>
              </button>
              {currentTeam?.creatorMember === user.uid && (
                <>
                  <button
                    onClick={() => setIsProjectModal(true)}
                    className="lg:px-4 lg:py-2 px-2 py-1 text-sm  rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300 flex items-center gap-x-1"
                  >
                    <IoMdAddCircleOutline size={18} />
                    <span className="lg:flex hidden">Proje Oluştur</span>
                  </button>
                  <button
                    onClick={() => setIsInviteModal(true)}
                    className="lg:px-4 lg:py-2 px-2 py-1  text-sm rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300 flex items-center gap-x-1"
                  >
                    <FaUsers size={18} />
                    <span className="lg:flex hidden">Takıma Davet Et</span>
                  </button>

                  <button
                    onClick={() => deleteTeam(teamID)}
                    className="lg:px-4 lg:py-2 px-2 py-1  text-sm rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 flex items-center gap-x-1"
                  >
                    <FaRegTrashAlt size={18} />
                    <span className="lg:flex hidden">Takımı Sil</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full py-6 h-full flex flex-col gap-y-3">
            <h1 className="lg:text-2xl text-lg font-semibold text-primaryDark ">
              Projeler
            </h1>
            <div
              className="w-full h-full grid lg:grid-cols-4 grid-cols-1 gap-5 "
              ref={animationParent}
            >
              {projects?.length > 0 ? (
                projects?.map((project) => (
                  <ProjectBox key={project.projectID} project={project} />
                ))
              ) : (
                <button
                  onClick={() => setIsProjectModal(true)}
                  className="bg-blue-100 hover:bg-primary text-primary transition-colors duration-300 hover:text-blue-100 px-4 flex justify-center items-center py-2 rounded-md"
                >
                  <h1 className="lg:text-[76px] text-sm font-semibold  flex justify-center items-center">
                    <IoMdAddCircleOutline />
                  </h1>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {isProjectModal && (
        <ProjectModal
          setIsProjectModal={setIsProjectModal}
          teamID={currentTeam.teamID}
        />
      )}
      {isInviteModal && (
        <InviteModal setIsInviteModal={setIsInviteModal} teamID={teamID} />
      )}
    </>
  );
};

export default Dashboard;
