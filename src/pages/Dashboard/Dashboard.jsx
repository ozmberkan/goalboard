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

const Dashboard = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { currentTeam, status } = useSelector((store) => store.teams);
  const [isInviteModal, setIsInviteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [isProjectModal, setIsProjectModal] = useState(false);

  ripples.register();

  useEffect(() => {
    if (teamID) {
      dispatch(getTeamByID(teamID));
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
            <h1 className="text-2xl font-semibold text-primaryDark">
              Projeler
            </h1>
            <div className="w-full h-full grid grid-cols-5 gap-5 ">
              {currentTeam?.projects.length > 0 ? (
                currentTeam?.projects.map((project) => (
                  <Link
                    to={`/project/${project.projectID}`}
                    className="bg-green-500 w-[300px] rounded-xl flex justify-center items-center "
                  >
                    {project.projectName}
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
