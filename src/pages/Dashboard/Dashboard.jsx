import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InviteModal from "~/components/UI/Modals/InviteModal";
import { db } from "~/firebase/firebase";
import { getTeamByID } from "~/redux/slices/teamsSlice";

const Dashboard = () => {
  const { teamID } = useParams();
  const dispatch = useDispatch();
  const { currentTeam, status } = useSelector((store) => store.teams);
  const [isInviteModal, setIsInviteModal] = useState(false);

  useEffect(() => {
    if (teamID) {
      dispatch(getTeamByID(teamID));
    }
  }, [dispatch]);

  if (status === "loading") {
    <div className="flex flex-grow justify-center items-center">
      Yükleniyor...
    </div>;
  }

  return (
    <>
      <div className="flex-grow p-4 flex">
        <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden">
          <div className="w-full justify-between items-center flex ">
            <h1 className="font-semibold text-4xl text-primary">
              {currentTeam?.teamName}
            </h1>
            <div className="flex gap-x-2 items-center">
              <button className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300">
                Proje Oluştur
              </button>
              <button
                onClick={() => setIsInviteModal(true)}
                className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300"
              >
                Takıma Davet Et
              </button>
            </div>
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
      {isInviteModal && <InviteModal setIsInviteModal={setIsInviteModal} />}
    </>
  );
};

export default Dashboard;
