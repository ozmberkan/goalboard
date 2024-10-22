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
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "~/components/UI/Modals/DeleteModal";
import InviteModal from "~/components/UI/Modals/InviteModal";
import { db } from "~/firebase/firebase";
import { getTeamByID } from "~/redux/slices/teamsSlice";
import { ripples } from "ldrs";

const Dashboard = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { currentTeam, status } = useSelector((store) => store.teams);
  const [isInviteModal, setIsInviteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
            {currentTeam?.createrMember === user.uid && (
              <div className="flex gap-x-2 items-center">
                <button className="px-4  text-sm py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300">
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
              </div>
            )}
          </div>
          <div className="w-full py-6 h-full flex flex-col gap-y-3">
            <h1 className="text-2xl font-semibold text-zinc-700">Projeler</h1>
            <div className="w-full h-full grid grid-cols-4 gap-5 ">
              <div className="bg-green-500 w-[300px] rounded-xl flex justify-center items-center ">
                Proje Adı
              </div>
            </div>
          </div>
        </div>
      </div>
      {isInviteModal && (
        <InviteModal setIsInviteModal={setIsInviteModal} teamID={teamID} />
      )}
      {isDelete && (
        <DeleteModal setIsDelete={setIsDelete} setConfirm={setConfirm} />
      )}
    </>
  );
};

export default Dashboard;
