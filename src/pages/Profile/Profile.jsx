import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "~/redux/slices/teamsSlice";
import { getUserByID } from "~/redux/slices/userSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RiFunctionAddFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { MdVerified } from "react-icons/md";
import TeamModal from "~/components/UI/Modals/TeamModal";
import PhotoEditModal from "~/components/UI/Modals/PhotoEditModal";
import TeamBox from "./Team/TeamBox";
import Avatar from "~/assets/noavatar.png";

const Profile = () => {
  const [animationParent] = useAutoAnimate();
  const { user } = useSelector((store) => store.user);
  const { teams, status } = useSelector((store) => store.teams);
  const [isEditPhoto, setIsEditPhoto] = useState(false);
  const [isTeamModal, setIsTeamModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(getUserByID(user?.uid));
      dispatch(getAllTeams(user?.uid));
    }
  }, [dispatch, user?.uid]);

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white dark:bg-darkPrimary ">
        <l-ripples size="150" speed="2" color="#3A5ADB"></l-ripples>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-4 flex"
      >
        <div className="w-full border bg-white transition-all duration-500 dark:bg-darkBox dark:border-darkBorder rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden">
          <div className="w-full flex  items-center lg:gap-5 gap-3 border-b dark:border-darkBorder pb-5 ">
            <div
              className="lg:p-12 p-10 rounded-full relative "
              style={{
                backgroundImage: user.photoURL
                  ? `url(${user.photoURL})`
                  : `url(${Avatar}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <button
                onClick={() => setIsEditPhoto(true)}
                className="absolute top-0 right-0 p-2 rounded-full border flex justify-center items-center bg-zinc-50"
              >
                <FaEdit />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-primary flex items-center gap-x-2">
                @{user.username}{" "}
                {user.premium !== "Silver" ? (
                  <span
                    className={`${
                      user.premium === "Platinum" && "text-sky-500"
                    } ${user.premium === "Gold" && "text-yellow-500"}`}
                  >
                    <MdVerified size={20} />
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span className="font-medium text-zinc-700 dark:text-darkText">
                {user.email}
              </span>
            </div>
          </div>
          <div className="w-full  flex flex-col gap-y-5 ">
            <div className="w-full flex justify-between items-center ">
              <h1 className="lg:text-2xl text-lg font-semibold text-primaryDark dark:text-neutral-400  ">
                Takımlarım
              </h1>
              <button
                onClick={() => setIsTeamModal(true)}
                className="lg:px-4 px-2 py-1   flex items-center gap-x-1  lg:text-base text-sm rounded-full bg-primary border-2 border-transparent text-white hover:border-primary hover:bg-white hover:text-primary"
              >
                <RiFunctionAddFill />{" "}
                <span className="lg:flex hidden">Takım Oluştur</span>
              </button>
            </div>

            <div
              className="w-full grid lg:grid-cols-4 grid-cols-1 gap-5"
              ref={animationParent}
            >
              {teams?.length > 0 ? (
                teams?.map((team) => <TeamBox key={team.teamID} team={team} />)
              ) : (
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-md w-full">
                  Henüz herhangi bir takıma dahil olmadınız!
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      {isEditPhoto && <PhotoEditModal setIsEditPhoto={setIsEditPhoto} />}
      {isTeamModal && <TeamModal setIsTeamModal={setIsTeamModal} />}
    </>
  );
};

export default Profile;
