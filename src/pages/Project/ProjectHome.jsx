import { Link, useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Logo from "~/assets/Logos/DarkLogoLittle.svg";
import { FaComment, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProjectHome = () => {
  const { projectID } = useParams();

  const { user } = useSelector((store) => store.user);

  return (
    <TabGroup className="flex flex-grow bg-white ">
      {/* SideBar */}
      <TabList className="flex flex-col items-center justify-between p-5 gap-y-5">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <img src={Logo} className="w-12" />
          <Tab className="w-full px-4 py-2 flex items-center justify-center bg-primary text-white font-medium  rounded-md gap-x-2">
            <FaHome />
            Anasayfa
          </Tab>
          <Tab className="w-full px-4 py-2 flex items-center justify-center bg-primary text-white font-medium  rounded-md gap-x-2">
            <FaComment />
            Yorumlar
          </Tab>
        </div>
        <div>
          <Link
            to={`/profile/${user.username}`}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
          >
            Geri Dön
          </Link>
        </div>
      </TabList>
      {/* Home */}
      <div className="bg-white w-full p-3 ">
        <TabPanels className="bg-zinc-200 w-full flex-grow h-full rounded-xl p-3">
          <TabPanel>Anasayfa - {projectID}</TabPanel>
          <TabPanel>Yorumlar</TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};

export default ProjectHome;
