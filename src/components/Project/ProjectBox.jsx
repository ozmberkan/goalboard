import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Avatar from "~/assets/noavatar.png";

const ProjectBox = ({ project, teamUsers }) => {
  return (
    <Link
      key={project.projectID}
      to={`/project/${project.projectID}`}
      className="bg-project-bg dark:bg-project-dark-bg dark:border-darkBorder bg-cover bg-center lg:h-[150px] h-[170px] bg-no-repeat hover:shadow-2xl transition-all duration-300 border-2 rounded-xl  p-5 flex flex-col justify-between items-start"
    >
      <div className="flex  gap-y-5 items-center justify-between w-full ">
        <span className="font-semibold text-xl text-zinc-700 dark:text-darkText  w-full flex items-center gap-x-2">
          {project.projectName}
        </span>
        <div className="font-semibold lg:text-sm text-xs bg-zinc-50 dark:bg-darkPrimary dark:border-darkBorder dark:text-darkText rounded-full border text-zinc-700  px-6 py-2 flex gap-x-3 items-center">
          <FaCalendarCheck />
          <span>{project.lastDate}</span>
        </div>
      </div>
      <div className="flex  gap-y-5 items-center justify-between w-full ">
        <span className="flex items-center -space-x-5 lg:font-medium text-sm">
          {teamUsers.map((user) => (
            <img
              key={user.uid}
              src={user.photoURL ? user.photoURL : Avatar}
              className="w-10 h-10 rounded-full object-cover border-4 border-zinc-100 shadow-lg"
            />
          ))}
        </span>
      </div>
    </Link>
  );
};

export default ProjectBox;
