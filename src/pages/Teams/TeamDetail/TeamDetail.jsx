import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailTeamsByID } from "~/redux/slices/teamSlice";
import { IoMdAddCircleOutline } from "react-icons/io";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "~/firebase/firebase";
import AddMemberModal from "~/components/UI/Modals/AddMember/AddMemberModal";

const TeamDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teams } = useSelector((store) => store.teams);
  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getDetailTeamsByID(id));
  }, [dispatch]);

  const deleteTeam = async (id) => {
    try {
      const teamRef = doc(db, "teams", id);
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(teamRef);
      await updateDoc(userRef, {
        teams: user.teams.filter((team) => team !== id),
      });
      toast.success("Takım başarıyla silindi.");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { teamName, teamProjects, teamMembers, teamID } = teams;

  return (
    <>
      <div className="flex-grow flex flex-col gap-y-5 items-start justify-start container mx-auto bg-white rounded-md border p-5">
        <div className="w-full flex justify-between items-center ">
          <h1 className="font-semibold text-5xl text-primary">{teamName}</h1>
          <div className="flex gap-x-2">
            <button
              onClick={() => deleteTeam(teamID)}
              className="px-5 py-1 rounded-full bg-red-500  text-white border"
            >
              Takımı Sil
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="px-5 py-1 rounded-full bg-primary text-white border"
            >
              Kullanıcı Ekle
            </button>
            <span className="px-5 py-1 rounded-full bg-zinc-50 border">
              {teamID?.slice(0, 5)}
            </span>
          </div>
        </div>
        <div className="w-full h-[400px] ">
          <h1 className="text-2xl font-semibold border-b pb-2">
            Proje Oluştur
          </h1>
          <div className="grid grid-cols-4 gap-5  h-full mt-2">
            <div className="bg-blue-500 h-full p-4 rounded-md">Proje Adı</div>
            <button className="bg-green-100 text-green-500 flex justify-center items-center h-full p-4 text-5xl rounded-md">
              <IoMdAddCircleOutline />
            </button>
          </div>
        </div>
      </div>
      {openModal && <AddMemberModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default TeamDetail;
