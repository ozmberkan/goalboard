import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "~/redux/slices/teamsSlice";
import { getUserByID } from "~/redux/slices/userSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { teams } = useSelector((store) => store.teams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByID(user?.uid));
    dispatch(getAllTeams());
  }, [dispatch]);

  const filteredTeam = teams.filter((team) => team.members.includes(user?.uid));

  return (
    <div className="flex-grow">
      Profile - {user?.email} - {user?.username}
      <div>
        Takımlarım:
        <div>
          {filteredTeam.map((team) => (
            <div key={team.teamID}>{team.teamName}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
