import React from "react";
import { TbUsers } from "react-icons/tb";
import { FiLayout } from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go";
import LittleLogo from "~/assets/Logos/DarkLogoLittle.svg";
import { RiFeedbackLine } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "~/assets/Logos/DarkLogo.svg";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { GoBell } from "react-icons/go";

const AdminSidebar = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const { allFeedbacks } = useSelector((store) => store.feedbacks);
  const { allVerified } = useSelector((store) => store.verified);

  return (
    <div className="lg:w-64 px-1 bg-zinc-100 border-r border-zinc-200 flex flex-col items-start justify-start">
      <Link className="w-full flex lg:justify-start justify-center items-center lg:px-4 px-2 py-6">
        <img
          src={!isTabletOrMobile ? Logo : LittleLogo}
          className="lg:w-44 w-12"
        />
      </Link>
      <div className="w-full lg:px-4 px-2 flex flex-col py-3  border-b">
        <Link
          to="/admin"
          className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  "
        >
          <FiLayout size={20} />
          {!isTabletOrMobile && <span>Genel Bakış</span>}
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center gap-x-4 py-2 px-4  text-zinc-700 text-base  rounded-md font-medium hover:bg-zinc-200  data-[selected]:bg-primary data-[selected]:text-white "
        >
          <TbUsers size={20} />
          {!isTabletOrMobile && <span>Kullanıcılar</span>}
        </Link>
        <Link
          to="/admin/teams"
          className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  "
        >
          <FaLayerGroup size={20} />
          {!isTabletOrMobile && <span>Takımlar</span>}
        </Link>
        <Link
          to="/admin/projects"
          className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-zinc-700 hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  "
        >
          <GoProjectRoadmap size={20} />
          {!isTabletOrMobile && <span>Projeler</span>}
        </Link>
      </div>
      <div className="w-full lg:px-4 px-2 flex flex-col py-3 border-t ">
        <Link
          to="/admin/feedbacks"
          className="flex items-center relative gap-x-4 py-2 px-4 text-zinc-700 text-base  rounded-md font-medium  hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  "
        >
          <RiFeedbackLine size={20} />
          <span className="absolute top-1 left-2 bg-primary w-4 h-4 rounded-full flex justify-center items-center text-xs text-white">
            {allFeedbacks.length}
          </span>
          {!isTabletOrMobile && <span>Geri Bildirimler</span>}
        </Link>
        <Link
          to="/admin/notification"
          className="flex items-center relative gap-x-4 py-2 px-4 text-zinc-700 text-base  rounded-md font-medium  hover:bg-zinc-200 data-[selected]:bg-primary data-[selected]:text-white  "
        >
          <GoBell size={20} />

          {!isTabletOrMobile && <span>Bildirim Gönder</span>}
        </Link>

        <Link
          to="/"
          className="flex items-center gap-x-4 py-2 px-4  text-base  rounded-md font-medium text-red-700 hover:bg-red-700 hover:text-white "
        >
          <TbLayoutSidebarLeftCollapse size={20} />
          {!isTabletOrMobile && <span>Geri Dön</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
