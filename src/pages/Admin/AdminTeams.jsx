import { useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import { motion } from "framer-motion";

const AdminTeams = () => {
  const { allTeams } = useSelector((store) => store.teams);
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
          Takımlar
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
      <div className="grid lg:grid-cols-5 grid-cols-1 place-items-center w-full lg:mt-3  py-5 px-4 gap-6">
        {allTeams.map((team) => (
          <div
            key={team.teamID}
            className=" w-full rounded-md bg-zinc-50 dark:bg-darkBox dark:border-darkBorder border p-3 "
          >
            <div className="w-full ">
              <span className="text-zinc-600 dark:text-darkText text-xl   font-semibold ">
                {team.teamName}
              </span>
            </div>
          </div>
        ))}
        {allTeams.length === 0 && (
          <div className="px-4 py-2 rounded-md bg-primary/25 text-primary font-medium">
            Herhangi bir takım mevcut değil!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminTeams;
