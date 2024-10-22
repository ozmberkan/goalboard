import { Outlet } from "react-router-dom";
import ProjectContainer from "~/containers/ProjectContainer";

const ProjectLayout = () => {
  return (
    <ProjectContainer>
      <Outlet />
    </ProjectContainer>
  );
};

export default ProjectLayout;
