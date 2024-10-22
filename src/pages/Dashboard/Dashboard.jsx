import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "~/firebase/firebase";
import { getTeamByID } from "~/redux/slices/teamsSlice";
import { ripples } from "ldrs";
import { FaUsers } from "react-icons/fa";
import ProjectModal from "~/components/UI/Modals/ProjectModal";
import { RiFileAddFill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getAllProjects } from "~/redux/slices/projectsSlice";

const Dashboard = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { currentTeam, status } = useSelector((store) => store.teams);
  const { projects } = useSelector((store) => store.projects);
  const [isInviteModal, setIsInviteModal] = useState(false);

  const [isProjectModal, setIsProjectModal] = useState(false);

  ripples.register();

  useEffect(() => {
    if (teamID) {
      dispatch(getTeamByID(teamID));
      dispatch(getAllProjects());
    }
  }, [dispatch]);

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

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white ">
        <l-ripples size="150" speed="2" color="#3A5ADB"></l-ripples>
      </div>
    );
  }

  const teamProjects = projects.filter((project) =>
    currentTeam?.projects.includes(project.projectID)
  );

  return (
    <>
      <div className="flex-grow p-4 flex">
        <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden">
          <div className="w-full justify-between items-center flex ">
            <h1 className="font-semibold text-4xl text-primary">
              {currentTeam?.teamName}
            </h1>
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center gap-x-2 bg-zinc-50 px-4 py-2 border rounded-md">
                <span className="flex items-center gap-x-2 font-medium">
                  <FaUsers />
                  {currentTeam?.members.length}
                </span>
              </div>
              {currentTeam?.createrMember === user.uid && (
                <>
                  <button
                    onClick={() => setIsProjectModal(true)}
                    className="px-4  text-sm py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300"
                  >
                    Proje Oluştur
                  </button>
                  <button
                    onClick={() => setIsInviteModal(true)}
                    className="px-4 py-2  text-sm rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300"
                  >
                    Takıma Davet Et
                  </button>

                  <button
                    onClick={() => deleteTeam(teamID)}
                    className="px-4 py-2  text-sm rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
                  >
                    Takımı Sil
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full py-6 h-full flex flex-col gap-y-3">
            <h1 className="text-3xl font-semibold text-primaryDark ">
              Projeler
            </h1>
            <div className="w-full h-full grid grid-cols-4 gap-5 ">
              {teamProjects.length > 0 ? (
                teamProjects.map((project) => (
                  <Link
                    key={project.projectID}
                    to={`/project/${project.projectID}`}
                    className="bg-project-bg bg-center bg-cover hover:shadow-xl transition-all duration-300 border rounded-xl  p-5 "
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-2xl text-zinc-700">
                        {project.projectName}
                      </span>
                      <span className="font-semibold text-sm text-zinc-700 bg-white rounded-full px-4">
                        {project.lastDate}
                      </span>
                    </div>
                  </Link>
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
        </div>
      </div>
      {isProjectModal && (
        <ProjectModal
          setIsProjectModal={setIsProjectModal}
          teamID={currentTeam.teamID}
        />
      )}
    </>
  );
};

export default Dashboard;
