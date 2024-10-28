import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Avatar from "~/assets/noavatar.png";
import ProjectModal from "~/components/UI/Modals/ProjectModal";
import InviteModal from "~/components/UI/Modals/InviteModal";
import ProjectBox from "~/components/Project/ProjectBox";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "~/firebase/firebase";
import { getTeamByID } from "~/redux/slices/teamsSlice";
import { ripples } from "ldrs";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getAllProjects } from "~/redux/slices/projectsSlice";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TbCircleArrowDownLeftFilled } from "react-icons/tb";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { setTeamsUser } from "~/redux/slices/userSlice";

const Dashboard = () => {
  const { teamID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animationParent] = useAutoAnimate();
  const { user, teamUsers } = useSelector((store) => store.user);
  const { currentTeam, status } = useSelector((store) => store.teams);
  const { projects } = useSelector((store) => store.projects);
  const [isInviteModal, setIsInviteModal] = useState(false);
  const [usersData, setUsersData] = useState([]);
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

  const fetchUsers = async () => {
    try {
      const membersUIDs = currentTeam?.members || [];

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "in", membersUIDs));

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (currentTeam) {
        dispatch(setTeamsUser(users));
      }
    } catch (error) {
      console.log("Kullanıcı bilgileri çekilemedi!");
    }
  };

  useEffect(() => {
    if (currentTeam && currentTeam.members) {
      fetchUsers();
    }
  }, [currentTeam]);

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white dark:bg-darkPrimary ">
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
          className="w-full border bg-white dark:bg-darkBox dark:border-darkBorder rounded-md p-8 flex flex-col gap-y-3 relative overflow-hidden"
        >
          <Tooltip
            id="my-tooltip"
            style={{ backgroundColor: "#3A5ADB", color: "#fff" }}
          />
          <div className="w-full font-medium ">
            <Link
              className="text-zinc-400 dark:text-neutral-400 hover:underline"
              to={`/profile/${user.username}`}
            >
              Profilim
            </Link>
            <span className="text-zinc-700 dark:text-neutral-400">
              {" / "}Projelerim
            </span>
          </div>

          <div className="w-full justify-between items-center flex">
            <h1 className="font-semibold lg:text-4xl text-lg text-primary dark:text-neutral-400">
              {currentTeam?.teamName}
            </h1>
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center gap-x-1 lg:py-2  py-1 ">
                <span className="flex items-center -space-x-5 lg:font-medium text-sm">
                  {teamUsers.map((user) => (
                    <img
                      key={user.uid}
                      src={user.photoURL ? user.photoURL : Avatar}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user.username}
                      className="w-10 h-10 rounded-full object-cover border-4 border-zinc-100 dark:border-darkBox shadow-lg"
                    />
                  ))}
                </span>
              </div>

              <>
                <Popover className="relative">
                  <PopoverButton className="lg:p-4 p-2 hover:bg-zinc-50 dark:text-darkText dark:hover:bg-darkPrimary rounded-full lg:text-2xl text-lg">
                    <FiSettings />
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom end"
                    className="flex flex-col border p-4 gap-y-5 mt-1 rounded-md bg-white dark:bg-darkBox dark:border-darkBorder shadow-lg"
                  >
                    {currentTeam?.creatorMember === user.uid && (
                      <>
                        <button
                          onClick={() => setIsProjectModal(true)}
                          className="lg:px-4 lg:py-2 px-2 py-1 text-sm  rounded-md dark:bg-darkBox dark:border-darkBorder dark:text-darkText dark:hover:text-neutral-400 text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border  transition-colors duration-300 flex items-center gap-x-2"
                        >
                          <IoMdAddCircleOutline size={18} />
                          <span>Proje Oluştur</span>
                        </button>
                        <button
                          onClick={() => setIsInviteModal(true)}
                          className="lg:px-4 lg:py-2 px-2 py-1  text-sm rounded-md dark:bg-darkBox dark:border-darkBorder dark:text-darkText dark:hover:text-neutral-400  text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border transition-colors duration-300 flex items-center gap-x-2"
                        >
                          <FaUsers size={18} />
                          <span>Takıma Davet Et</span>
                        </button>
                        <button
                          onClick={() => deleteTeam(teamID)}
                          className="lg:px-4 lg:py-2 px-2 py-1  text-sm rounded-md dark:bg-darkBox dark:border-darkBorder dark:text-darkText  text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border transition-colors duration-300 flex items-center gap-x-2"
                        >
                          <FaRegTrashAlt size={18} className="text-red-500" />
                          <span className=" text-red-500">Takımı Sil</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => leaveTeam(user.uid)}
                      className="lg:px-4 lg:py-2 px-2 py-1 text-sm  rounded-md dark:bg-darkBox dark:border-darkBorder dark:text-darkText  text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border transition-colors duration-300 flex items-center gap-x-2"
                    >
                      <TbCircleArrowDownLeftFilled
                        size={18}
                        className="text-red-500"
                      />
                      <span className=" text-red-500">Takımdan Ayrıl</span>
                    </button>
                  </PopoverPanel>
                </Popover>
              </>
            </div>
          </div>
          <div className="w-full py-6 h-full flex flex-col gap-y-5">
            <h1 className="lg:text-2xl text-lg font-semibold text-primaryDark dark:text-darkText dark:border-darkBorder pb-3 border-b ">
              Projeler
            </h1>
            <div
              className="w-full h-full grid lg:grid-cols-4 grid-cols-1 gap-5 "
              ref={animationParent}
            >
              {projects?.length > 0 ? (
                projects?.map((project) => (
                  <ProjectBox
                    key={project.projectID}
                    project={project}
                    teamUsers={teamUsers}
                  />
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
