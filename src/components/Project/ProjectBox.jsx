import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegCheckCircle, FaRegListAlt } from "react-icons/fa";
import { PiProjectorScreen } from "react-icons/pi";
import { Link } from "react-router-dom";

const ProjectBox = ({ project }) => {
  return (
    <Link
      key={project.projectID}
      to={`/project/${project.projectID}`}
      className="bg-project-bg bg-cover bg-center bg-no-repeat hover:shadow-xl transition-all duration-300 border-2 rounded-md  p-5 flex flex-col justify-between items-start"
    >
      <div className="flex flex-col gap-y-2 items-center justify-start">
        <span className="font-semibold text-xl text-zinc-700  w-full flex items-center gap-x-2">
          <PiProjectorScreen /> {project.projectName}
        </span>
        <span className="font-semibold text-xl text-zinc-700  w-full flex items-center gap-x-2">
          <FaRegListAlt size={18} /> {project.tasks.length}
        </span>
        <span className="font-semibold text-xl text-zinc-700  w-full flex items-center gap-x-2">
          <AiOutlineRetweet size={18} /> {project.testTasks.length}
        </span>
        <span className="font-semibold text-xl text-zinc-700  w-full flex items-center gap-x-2">
          <FaRegCheckCircle size={18} /> {project.completeTasks.length}
        </span>
      </div>
      <div className="font-semibold text-sm lg:mt-0 mt-3 text-zinc-600 bg-white rounded-md px-4 py-2 border shadow-md w-full flex justify-between items-center">
        <span>Son Teslim Tarihi</span>
        <span>{project.lastDate}</span>
      </div>
    </Link>
  );
};

export default ProjectBox;
