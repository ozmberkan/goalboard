import ProjectLayout from "~/layouts/ProjectLayout";
import ProjectHome from "~/pages/Project/ProjectHome";

export const ProjectRoute = {
  path: "/project/:projectID",
  element: <ProjectLayout />,
  children: [{ path: "", element: <ProjectHome /> }],
};