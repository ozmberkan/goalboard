import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { GoProjectRoadmap } from "react-icons/go";
import { FaLayerGroup, FaUser } from "react-icons/fa6";
import Avatar from "~/assets/noavatar.png";

const AdminFeedBacks = () => {
  const { allFeedbacks } = useSelector((store) => store.feedbacks);
  const { user } = useSelector((store) => store.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow  lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white dark:bg-darkPrimary"
    >
      <div className="w-full   px-4 py-2 flex justify-between items-center h-18 border-b dark:border-darkBorder">
        <span className="lg:text-2xl text-lg font-bold text-zinc-600 dark:text-darkText lg:flex hidden">
          Geri Bildirimler
        </span>
        <div className="lg:pl-5 py-2 lg:border-l dark:border-darkBorder flex items-center gap-x-3">
          <img
            src={user.photoURL ? user.photoURL : Avatar}
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col gap-y-1 text-zinc-600 dark:text-darkText">
            <div className="text-sm">{user.email}</div>
            <div className="text-sm">@{user.username}</div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-1 grid-cols-1 place-items-center w-full lg:mt-3 py-5 px-4 gap-6">
        {allFeedbacks?.map((feedback, i) => (
          <div
            key={i}
            className=" w-full rounded-md bg-zinc-50 dark:border-darkBorder dark:bg-darkBox border p-3 "
          >
            <div className="w-full flex flex-col gap-y-2 ">
              <div className="w-full border-b dark:border-darkBorder py-2 text-zinc-700 flex justify-between">
                <div className="flex flex-col gap-y-1">
                  {feedback.username ? (
                    <span className="text-primary flex gap-x-2 items-center">
                      <FaUser />
                      {feedback.username ? feedback.username : "Anonim"}
                    </span>
                  ) : (
                    <span className="text-primary  flex gap-x-2 items-center">
                      {feedback.name}
                    </span>
                  )}
                  {feedback.teamName && (
                    <>
                      <span className="text-primary flex gap-x-2 items-center">
                        <FaLayerGroup />
                        {feedback.teamName}
                      </span>
                      <span className="text-primary flex gap-x-2 items-center">
                        <GoProjectRoadmap /> {feedback.projectName}
                      </span>
                    </>
                  )}
                </div>
                <span className="text-sm text-zinc-600">
                  {feedback.createdAt}
                </span>
              </div>
              <span className="text-zinc-600 dark:text-white text-sm  w-full  font-medium ">
                {feedback.message}
              </span>
            </div>
          </div>
        ))}
        {allFeedbacks.length === 0 && (
          <div className=" w-full px-4 py-2 rounded-md bg-primary/25 text-primary font-medium">
            Herhangi bir bildirim mevcut değil!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminFeedBacks;
