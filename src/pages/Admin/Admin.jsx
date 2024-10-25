import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
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
    dispatch(getAllTeamsForAdmin());
    dispatch(getAllProjectsForAdmin());
    dispatch(getAllFeedBacksForAdmin());
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow  lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white">
      <div className="w-full   px-4 py-2 flex justify-between items-center h-18 border-b">
        <span className="lg:text-2xl text-lg font-bold text-zinc-600 lg:flex hidden">
          Hoş geldin, {user.username}
        </span>
        <div className="lg:pl-5 py-2 lg:border-l flex items-center gap-x-3">
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
      <div className="grid lg:grid-cols-3 grid-cols-1 place-items-center w-full lg:mt-6 py-5 px-4 gap-6">
        <div className="h-[200px]  w-full rounded-md bg-[#F9E5CF] p-3 ">
          <div className="w-full border-b border-orange-300 pb-2">
            <span className="text-orange-600 text-xl   font-semibold ">
              Kullanıcı Sayısı
            </span>
          </div>
          <div className="w-full py-4">
            <span className="text-4xl text-orange-600">{allUsers.length}</span>
          </div>
        </div>
        <div className="h-[200px]  w-full rounded-md bg-gradient-to-b from-[#C0F4E6] to-[#D9F4E5] p-3 shadow-lg ">
          <div className="w-full border-b border-green-300 pb-2">
            <span className="text-green-600 text-xl   font-semibold ">
              Takım Sayısı
            </span>
          </div>
          <div className="w-full py-4">
            <span className="text-4xl text-green-600">{allTeams.length}</span>
          </div>
        </div>
        <div className="h-[200px]  w-full rounded-md bg-gradient-to-b from-[#CAEFF9] to-[#DFF3F8] p-3 shadow-lg ">
          <div className="w-full border-b border-blue-300 pb-2">
            <span className="text-blue-600 text-xl   font-semibold ">
              Proje Sayısı
            </span>
          </div>
          <div className="w-full py-4  flex justify-start items-center ">
            <span className="text-4xl text-blue-600">{allProjects.length}</span>
          </div>
        </div>

        <div className="h-[200px]  w-full rounded-md bg-gradient-to-b from-[#CFCAF9] to-[#E4E0F8] p-3 shadow-lg ">
          <div className="w-full border-b border-violet-300 pb-2">
            <span className="text-violet-600 text-xl   font-semibold ">
              Geribildirim Sayısı
            </span>
          </div>
          <div className="w-full py-4  flex justify-start items-center ">
            <span className="text-4xl text-violet-600">
              {allFeedbacks.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
