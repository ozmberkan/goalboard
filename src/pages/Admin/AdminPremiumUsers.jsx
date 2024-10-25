import React from "react";
import { useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import { motion } from "framer-motion";

const AdminPremiumUsers = () => {
  const { allUsers, user } = useSelector((store) => store.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow  lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white"
    >
      <div className="w-full   px-4 py-2 flex justify-between items-center h-18 border-b">
        <span className="lg:text-2xl text-lg font-bold text-zinc-600 lg:flex hidden">
          Kullanıcılar
        </span>
        <div className="pl-5 py-2 border-l flex items-center gap-x-3">
          <img
            src={user.photoURL ? user.photoURL : Avatar}
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col gap-y-1 text-zinc-600">
            <div className="text-sm">{user.email}</div>
            <div className="text-sm">@{user.username}</div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 grid-cols-1 place-items-center w-full lg:mt-6 py-5 px-4 gap-6">
        {allUsers.map((user) => {
          return (
            user?.premium !== "Silver" && (
              <div className="h-[200px]  w-full rounded-md bg-[#F9E5CF] p-3 ">
                <div className="w-full border-b border-orange-300 pb-2">
                  <span className="text-orange-600 text-xl   font-semibold ">
                    {user.username}
                  </span>
                </div>
                <div className="w-full py-4">
                  <span className="text-4xl text-orange-600">
                    {user.premium}
                  </span>
                </div>
              </div>
            )
          );
        })}
      </div>
    </motion.div>
  );
};

export default AdminPremiumUsers;
