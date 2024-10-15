import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "~/firebase/firebase";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    const teamsRef = collection(db, "teams");

    const teams = await getDocs(teamsRef);

    const teamsData = teams.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTeams(teamsData);
  };

  const filteredTeam = teams.filter((team) => team.teamCreaterID === user?.uid);

  useEffect(() => {
    fetchTeams();
  }, []);

  console.log(user);

  return (
    <div className="flex flex-grow w-full  container mx-auto ">
      <div className="w-full h-full bg-white rounded-md border p-5 flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold text-primary">@{user?.username}</h1>
        <h2 className="text-2xl text-primaryDark font-bold border-b pb-2">
          Takımlar
        </h2>
        <div className="w-full  h-24 rounded-md  grid grid-cols-4">
          {filteredTeam.map((item) => (
            <Link
              to={`/team/${item.id}`}
              key={item.id}
              className="bg-primary rounded-md text-white flex justify-center items-center font-semibold"
            >
              {item.teamName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
