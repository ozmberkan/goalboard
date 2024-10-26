import { FaStar, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const TeamBox = ({ team }) => {
  const { createdAt, members, teamName, teamID, projects } = team;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/${teamID}`)}
      className="cursor-pointer"
    >
      <div className="p-4  border-2 hover:shadow-2xl h-[150px] bg-team-bg bg-cover bg-center  rounded-xl  flex flex-col items-center justify-between gap-y-3 transition-all duration-300">
        <div className="w-full flex justify-between items-center">
          <Link className="font-bold text-primaryDark text-2xl">
            {teamName}
          </Link>
        </div>
        <div className="w-full flex gap-x-4">
          <div className="flex gap-x-2">
            <span className="text-xs bg-white border px-2 py-1 rounded-full text-zinc-800 font-medium">
              {createdAt}
            </span>
            <div className="text-xs flex justify-center items-center gap-x-1 bg-white border px-2 rounded-full text-zinc-800 font-medium">
              <span className="lg:flex hidden">
                <FaUsers />
              </span>
              <span>{members.length} Kişi</span>
            </div>
            <div className="text-xs flex justify-center items-center gap-x-1 bg-white border px-2 rounded-full text-zinc-800 font-medium">
              <span className="lg:flex hidden">
                <FaStar />
              </span>
              <span>{projects.length} Proje</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBox;
