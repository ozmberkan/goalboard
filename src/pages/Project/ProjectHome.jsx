import { Link, useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Logo from "~/assets/Logos/DarkLogo.svg";
import LittleLogo from "~/assets/Logos/DarkLogoLittle.svg";

import { useSelector } from "react-redux";
import Tasks from "~/components/Project/Tasks";
import { FiLayout } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import Comments from "~/components/Project/Comments";
import ProjectSettings from "~/components/Project/ProjectSettings";
import FeedBack from "~/components/Project/FeedBack";
import Archive from "~/components/Project/Archive";
import { IoArchiveOutline } from "react-icons/io5";

const ProjectHome = () => {
  const { projectID } = useParams();

  const { user } = useSelector((store) => store.user);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <TabGroup className="flex flex-grow bg-primary">
      {/* SideBar */}
      <TabList className="lg:w-72 px-1 bg-zinc-100 border-r border-zinc-200 flex flex-col items-start justify-start">
        <Link
          to={`/profile/${user?.username}`}
          className="w-full flex lg:justify-start justify-center items-center lg:px-4 px-2 py-6"
        >
          <img
            src={!isTabletOrMobile ? Logo : LittleLogo}
            className="lg:w-44 w-12"
          />
        </Link>
        <div className="w-full lg:px-4 px-2 flex flex-col py-3  border-b">
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <FiLayout size={20} />
            {!isTabletOrMobile && <span>Genel Bakış</span>}
          </Tab>
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-zinc-700 text-base  rounded-md font-medium hover:bg-zinc-200  data-[selected]:bg-primary data-[selected]:text-white ">
            <FaRegComments size={20} />
            {!isTabletOrMobile && <span>Yorumlar</span>}
          </Tab>

          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <IoArchiveOutline size={20} />
            {!isTabletOrMobile && <span>Arşiv</span>}
          </Tab>
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <TbSettings size={20} />
            {!isTabletOrMobile && <span>Ayarlar</span>}
          </Tab>
        </div>
        <div className="w-full lg:px-4 px-2 flex flex-col gap-y-2 py-3 border-t ">
          <Tab className="flex items-center gap-x-4 py-2 px-4 text-zinc-700 text-base  rounded-md font-medium  hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <RiFeedbackLine size={20} />
            {!isTabletOrMobile && <span>Geri Bildirim</span>}
          </Tab>
          <Link
            to={`/profile/${user?.username}`}
            className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-red-700 hover:bg-red-700 hover:text-white "
          >
            <TbLayoutSidebarLeftCollapse size={20} />
            {!isTabletOrMobile && <span>Geri Dön</span>}
          </Link>
        </div>
      </TabList>
      {/* Home */}
      <div className="bg-white w-full min-h-screen flex flex-grow">
        <TabPanels className="w-full flex flex-grow">
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <Tasks projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <Comments projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 px-12">
            <Archive projectID={projectID} />
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
