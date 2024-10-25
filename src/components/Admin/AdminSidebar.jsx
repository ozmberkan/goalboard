import React from "react";
import { TbUsers } from "react-icons/tb";
import { FiLayout } from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go";
import LittleLogo from "~/assets/Logos/DarkLogoLittle.svg";
import { RiFeedbackLine } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { NavLink } from "react-router-dom";
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
      <NavLink
        className="w-full flex lg:justify-start justify-center items-center lg:px-4 px-2 py-6"
        to="/admin"
      >
        <img
          src={!isTabletOrMobile ? Logo : LittleLogo}
          className="lg:w-44 w-12"
        />
      </NavLink>
      <div className="w-full lg:px-4 px-2 flex flex-col py-3  border-b">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-zinc-200 text-zinc-700"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <FiLayout size={20} />
          {!isTabletOrMobile && <span>Genel Bakış</span>}
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-primary text-white"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <TbUsers size={20} />
          {!isTabletOrMobile && <span>Kullanıcılar</span>}
        </NavLink>
        <NavLink
          to="/admin/teams"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-primary text-white"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <FaLayerGroup size={20} />
          {!isTabletOrMobile && <span>Takımlar</span>}
        </NavLink>
        <NavLink
          to="/admin/projects"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-primary text-white"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <GoProjectRoadmap size={20} />
          {!isTabletOrMobile && <span>Projeler</span>}
        </NavLink>
      </div>
      <div className="w-full lg:px-4 px-2 flex flex-col py-3 border-t">
        <NavLink
          to="/admin/feedbacks"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-primary text-white"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <RiFeedbackLine size={20} />
          <span className="absolute top-1 left-2 bg-primary w-4 h-4 rounded-full flex justify-center items-center text-xs text-white">
            {allFeedbacks.length}
          </span>
          {!isTabletOrMobile && <span>Geri Bildirimler</span>}
        </NavLink>
        <NavLink
          to="/admin/notification"
          className={({ isActive }) =>
            isActive
              ? "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium  bg-primary text-white"
              : "flex items-center relative gap-x-4 py-2 px-4 text-base rounded-md font-medium text-zinc-700 hover:bg-zinc-200"
          }
        >
          <GoBell size={20} />
          {!isTabletOrMobile && <span>Bildirim Gönder</span>}
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center gap-x-4 py-2 px-4 text-base rounded-md font-medium text-red-700 hover:bg-red-700 hover:text-white"
        >
          <TbLayoutSidebarLeftCollapse size={20} />
          {!isTabletOrMobile && <span>Geri Dön</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
