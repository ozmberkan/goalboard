import { Link, useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Logo from "~/assets/Logos/DarkLogoLittle.svg";
import { FaComment, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import Tasks from "~/components/Project/Tasks";

const ProjectHome = () => {
  const { projectID } = useParams();

  const { user } = useSelector((store) => store.user);

  return (
    <TabGroup className="flex flex-grow bg-primary ">
      {/* SideBar */}
      <TabList className="flex flex-col items-center justify-between p-5 gap-y-5">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <img src={Logo} className="w-12" />
          <Tab className="w-full px-4 py-2 flex items-center justify-center bg-white text-primary font-medium  rounded-md gap-x-2">
            <FaHome />
            Anasayfa
          </Tab>
          <Tab className="w-full px-4 py-2 flex items-center justify-center bg-white text-primary font-medium  rounded-md gap-x-2">
            <FaComment />
            Yorumlar
          </Tab>
        </div>
        <div>
          <Link
            to={`/profile/${user.username}`}
            className="bg-white text-primary px-4 py-2 rounded-md hover:bg-primaryDark hover:text-white transition-colors duration-300"
          >
            Geri Dön
          </Link>
        </div>
      </TabList>
      {/* Home */}
      <div className="bg-primary w-full p-3 ">
        <TabPanels className="bg-white w-full h-full rounded-xl p-6">
          <TabPanel className=" flex-grow w-full">
            <Tasks projectID={projectID} />
          </TabPanel>
          <TabPanel>Yorumlar</TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};

export default ProjectHome;
