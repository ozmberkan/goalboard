import Logo from "~/assets/Logos/DarkLogo.svg";
import LittleLogo from "~/assets/Logos/DarkLogoLittle.svg";
import Tasks from "~/components/Project/Tasks";
import Comments from "~/components/Project/Comments";
import ProjectSettings from "~/components/Project/ProjectSettings";
import FeedBack from "~/components/Project/FeedBack";
import Archive from "~/components/Project/Archive";
import { useDispatch, useSelector } from "react-redux";
import { FiLayout } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import { IoArchiveOutline } from "react-icons/io5";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Avatar from "~/assets/noavatar.png";

const ProjectHome = () => {
  const { projectID } = useParams();
  const { user } = useSelector((store) => store.user);
  const { currentProject } = useSelector((store) => store.projects);
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    dispatch(getProjectsByID(projectID));
  }, []);

  return (
    <TabGroup className="flex flex-grow">
      <TabList className="lg:w-72 px-1 bg-zinc-100 border-r border-zinc-200 flex flex-col items-start justify-start">
        <div className="w-full flex lg:justify-start justify-center items-center lg:px-4 px-2 py-6">
          <img
            src={!isTabletOrMobile ? Logo : LittleLogo}
            className="lg:w-44 w-12"
          />
        </div>
        <div className="w-full lg:px-4 px-2 flex flex-col py-3  border-b">
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <FiLayout size={20} />
            {!isTabletOrMobile && <span>Genel Bakış</span>}
          </Tab>
          <Tab className="flex items-center gap-x-4 py-2 px-4  text-zinc-700 text-base  rounded-md font-medium hover:bg-zinc-200  data-[selected]:bg-primary data-[selected]:text-white ">
            <FaRegComments size={20} />
            {!isTabletOrMobile && <span>Yorumlar</span>}
          </Tab>

          <Tab className="flex items-center gap-x-4 py-2 px-4 relative  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <IoArchiveOutline size={20} />
            <span className="absolute top-1 left-2 bg-primary  w-4 h-4 rounded-full flex justify-center items-center text-xs text-white">
              {currentProject?.archiveTasks?.length}
            </span>
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
        <div className="w-full lg:px-4 px-2 lg:flex hidden flex-col gap-y-2 py-3 border-t mt-auto ">
          <div className="flex relative items-center gap-x-2 py-2 px-2 text-zinc-700 text-base  rounded-md font-medium  hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  ">
            <img
              src={user.photoURL ? user.photoURL : Avatar}
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className="absolute left-0 top-0  w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-100 ">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{user.username}</span>
              <span className="text-xs">{user.email}</span>
            </div>
          </div>
        </div>
      </TabList>
      {/* Home */}
      <div className="bg-white w-full min-h-screen flex flex-grow">
        <TabPanels className="w-full flex flex-grow">
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <Tasks projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <Comments projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <Archive projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <ProjectSettings projectID={projectID} />
          </TabPanel>
          <TabPanel className="w-full  flex-grow py-3 lg:px-12 px-4">
            <FeedBack />
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};

export default ProjectHome;
