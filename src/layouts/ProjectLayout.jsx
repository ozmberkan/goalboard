import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ProjectContainer from "~/containers/ProjectContainer";

const ProjectLayout = () => {
  return (
    <ProjectContainer>
      <Outlet />
      <Toaster />
    </ProjectContainer>
  );
};

export default ProjectLayout;
