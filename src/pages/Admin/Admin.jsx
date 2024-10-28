import { all } from "axios";
import { set } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import { adminDashboard } from "~/data/data";
import { db } from "~/firebase/firebase";
import { getAllFeedBacksForAdmin } from "~/redux/slices/contactsSlice";
import { getAllProjectsForAdmin } from "~/redux/slices/projectsSlice";
import { getAllTeamsForAdmin } from "~/redux/slices/teamsSlice";
import { getAllUserForAdmin } from "~/redux/slices/userSlice";

const Admin = () => {
  const { user, allUsers, status } = useSelector((store) => store.user);
  const { allTeams } = useSelector((store) => store.teams);
  const { allProjects } = useSelector((store) => store.projects);
  const { allFeedbacks } = useSelector((store) => store.feedbacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserForAdmin());
    dispatch(getAllProjectsForAdmin());
    dispatch(getAllFeedBacksForAdmin());
    dispatch(getAllTeamsForAdmin());
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white dark:bg-darkPrimary">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow  lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white dark:bg-darkPrimary">
      <div className="w-full   px-4 py-2 flex justify-between items-center h-18 border-b dark:border-darkBorder">
        <span className="lg:text-2xl text-lg font-bold text-zinc-600 dark:text-darkText lg:flex hidden">
          Hoş geldin, {user.username}
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
      <div className="grid lg:grid-cols-3 grid-cols-1 place-items-center w-full lg:mt-6 py-5 px-4 gap-6">
        {adminDashboard.map((item) => (
          <div
            key={item.id}
            className={`h-[200px] w-full rounded-md bg-gradient-to-b p-3 
          ${item.key === "users" && "from-[#C0F4E6] to-[#D9F4E5]"}
          ${item.key === "teams" && "from-[#FFD3B5] to-[#FFEEE6]"}
          ${item.key === "projects" && "from-[#CAEFF9] to-[#DFF3F8]"}
          ${item.key === "feedbacks" && "from-[#CFCAF9] to-[#E4E0F8] "}
          `}
          >
            <div
              className={`w-full border-b border-orange-300 pb-2
              ${item.key === "users" && "border-green-500"}
              ${item.key === "teams" && "border-orange-500"}
              ${item.key === "projects" && "border-blue-500"}
              ${item.key === "feedbacks" && "border-purple-500"}
              
              `}
            >
              <span
                className={` text-xl   font-semibold 
                ${item.key === "users" && "text-green-500"} 
                ${item.key === "teams" && "text-orange-500"}
                ${item.key === "projects" && "text-blue-500"}
                ${item.key === "feedbacks" && "text-purple-500"}
                `}
              >
                {item.label}
              </span>
            </div>
            <div className="w-full py-4">
              <span
                className={`text-4xl 
                ${item.key === "users" && "text-green-500"}
                ${item.key === "teams" && "text-orange-500"}
                ${item.key === "projects" && "text-blue-500"}
                ${item.key === "feedbacks" && "text-purple-500"} 
                `}
              >
                {item.key === "users" && allUsers.length}
                {item.key === "teams" && allTeams.length}
                {item.key === "projects" && allProjects.length}
                {item.key === "feedbacks" && allFeedbacks.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
