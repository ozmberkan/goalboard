import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PhotoEditModal from "~/components/UI/Modals/PhotoEditModal";
import { getAllTeams } from "~/redux/slices/teamsSlice";
import { getUserByID } from "~/redux/slices/userSlice";
import TeamBox from "./Team/TeamBox";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { teams } = useSelector((store) => store.teams);
  const [isEditPhoto, setIsEditPhoto] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByID(user?.uid));
    dispatch(getAllTeams());
  }, [dispatch]);

  const filteredTeam = teams.filter((team) => team.members.includes(user?.uid));

  return (
    <>
      <div className="flex-grow p-4 flex">
        <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden">
          <div className="w-full flex items-center gap-5 border-b pb-5">
            <div
              className="p-12 rounded-full relative"
              style={{
                backgroundImage: user.photoURL
                  ? `url(${user.photoURL})`
                  : "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7x7RFFT8-4WY26mVJxhk5lvmoTIhb_0NzAQ&s')",
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
              <span className="font-semibold text-primary">
                @{user.username}
              </span>
              <span className="font-medium text-zinc-00">{user.email}</span>
            </div>
          </div>
          <div className="w-full  p-4 flex flex-col gap-y-5 ">
            <h1 className="font-semibold text-2xl">Takımlarım</h1>
            <div className="w-full grid grid-cols-5 gap-5">
              {filteredTeam.length > 0 ? (
                filteredTeam.map((team) => (
                  <TeamBox key={team.teamID} team={team} />
                ))
              ) : (
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-md w-full">
                  Henüz takım oluşturmadınız!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isEditPhoto && <PhotoEditModal setIsEditPhoto={setIsEditPhoto} />}
    </>
  );
};

export default Profile;
