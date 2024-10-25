import { Link } from "react-router-dom";

const ProjectBox = ({ project }) => {
  return (
    <Link
      key={project.projectID}
      to={`/project/${project.projectID}`}
      className="bg-project-bg bg-cover bg-center bg-no-repeat hover:shadow-xl transition-all duration-300 border-2 rounded-md  p-5 flex flex-col justify-between items-start"
    >
      <div className="flex flex-col gap-y-5 items-center justify-start w-full">
        <span className="font-semibold text-xl text-zinc-700  w-full flex items-center gap-x-2">
          {project.projectName}
        </span>
        <div className="font-semibold text-sm lg:mt-0 mt-3 text-zinc-600 bg-white rounded-md px-4 py-2 border shadow-md w-full flex justify-between items-center">
          <span>{project.lastDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;
