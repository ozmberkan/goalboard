import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoProjectRoadmap } from "react-icons/go";

const TeamBox = ({ team, deleteHandle }) => {
  const { createdAt, members, teamName, teamID, projects } = team;
  return (
    <div className="p-4 rounded-md border h-[150px] bg-zinc-50 flex flex-col items-center justify-between gap-y-3">
      <div className="w-full flex justify-between items-center">
        <Link
          to={`/dashboard/${teamID}`}
          className="font-bold text-primary text-2xl"
        >
          {teamName}
        </Link>
        <span className="text-xs bg-zinc-100 border px-4 py-1 rounded-full text-zinc-700">
          {createdAt}
        </span>
      </div>
      <div className="w-full flex gap-x-4">
        <div className="flex items-center text-sm justify-between gap-x-1 bg-white border px-2 py-1 rounded-md w-full">
          <div className="w-full flex items-center gap-x-3">
            <FaUsers size={18} />
            <span className="font-medium text-lg">{members.length}</span>
          </div>
          <div className="w-full flex items-center gap-x-3">
            <GoProjectRoadmap size={18} />
            <span className="font-medium text-lg">{projects.length}</span>
          </div>
        </div>
        <div className="flex-col gap-2 flex">
          <Link
            to={`/dashboard/${teamID}`}
            className="flex items-center text-sm justify-between gap-x-1 bg-primary hover:bg-primaryDark transition-colors duration-300 text-white px-2 py-1 rounded-md"
          >
            Detay
          </Link>
          <button
            onClick={() => deleteHandle(teamID)}
            className="flex items-center text-sm justify-between gap-x-1 bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white px-2 py-1 rounded-md"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamBox;
