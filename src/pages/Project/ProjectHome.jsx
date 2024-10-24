import { Link, useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Logo from "~/assets/Logos/DarkLogo.svg";
import { useSelector } from "react-redux";
import Tasks from "~/components/Project/Tasks";
import { FiLayout } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

import { RiFeedbackLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import Comments from "~/components/Project/Comments";
import ProjectSettings from "~/components/Project/ProjectSettings";
import FeedBack from "~/components/Project/FeedBack";

const ProjectHome = () => {
  const { projectID } = useParams();

  const { user } = useSelector((store) => store.user);

  return (
    <TabGroup className="flex flex-grow bg-primary">
      {/* SideBar */}
      <TabList className="w-72 px-1 bg-zinc-100 border-r border-zinc-200 flex flex-col items-start justify-start">
        <Link
          to={`/profile/${user?.username}`}
          className="w-full flex justify-start items-center px-4 py-6"
        >
          <img src={Logo} className="w-44" />
        </Link>
        <div className="w-full px-4 flex flex-col py-3  border-b">
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <FiLayout size={20} />
            Genel Bakış
          </Tab>
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-zinc-700 text-base  rounded-md font-medium hover:bg-zinc-200  data-[selected]:bg-primary data-[selected]:text-white ">
            <FaRegComments size={20} />
            Yorumlar
          </Tab>
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <TbSettings size={20} />
            Proje Ayarları
          </Tab>
        </div>
        <div className="w-full px-4 flex flex-col py-3 border-t ">
          <Tab className="flex items-center gap-x-4 py-2 px-4 text-zinc-700 text-base  rounded-md font-medium  hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <RiFeedbackLine size={20} />
            Geri Bildirim
          </Tab>
          <Link
            to={`/profile/${user?.username}`}
            className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-red-700 hover:bg-red-700 hover:text-white "
          >
            <TbLayoutSidebarLeftCollapse size={20} />
            Geri Dön
          </Link>
        </div>
      </TabList>
      {/* Home */}
      <div className="bg-white w-full min-h-screen flex flex-grow">
        <TabPanels className="w-full flex flex-grow">
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <Tasks projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <Comments projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <ProjectSettings />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <FeedBack />
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};

export default ProjectHome;
