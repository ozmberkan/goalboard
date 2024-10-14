import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex flex-grow w-full p-12 ">
      <div className="w-full h-full bg-white rounded-md border p-5 flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold text-primary">@{user?.username}</h1>
        <h2 className="text-2xl text-primaryDark font-bold border-b pb-2">
          Takımlar
        </h2>
        <div className="w-full  h-24 rounded-md  grid grid-cols-4">
          <div className="bg-primary rounded-md text-white flex justify-center items-center font-semibold">
            Team Name
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
