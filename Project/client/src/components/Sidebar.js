import React from "react";

// Images
import Logo from "../assets/Logo.svg";
import MenuItem from "./menuItem.js";
import SideBarIlu from "../assets/sidebar_ilu.svg";
import { link } from "react-router-dom";

// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

// Hero Icons
// import {
//   HomeIcon,
//   ChartSquareBarIcon,
//   PlusCircleIcon,
//   LogoutIcon,
//   CogIcon,
// } from "@heroicons/react/outline";

// MUI Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const Sidebar = () => {
  return (
    <div className="h-full min-h-screen flex">
      <div className="w-full flex flex-col justify-between in-h-full shadow-2xl rounded-[30px] py-4 bg-white">
        <div>
          <div className=" flex items-center justify-center mb-2 mx-4 ">
            <img src={Logo} alt="Logo" className="w-full h-full" />
          </div>
          {/* UL Links */}
          <ul className="">
            {/* Home Page */}
            <a className="text-xl mb-6  font-[Klavika-Medium]">
              <MenuItem Icon={HomeOutlinedIcon} Title="Home" />
            </a>

            {/* Stock */}

            <a
              href="`{stocks}`"
              className="text-xl mb-6  font-[Klavika-Medium]"
            >
              <MenuItem Icon={BarChartOutlinedIcon} Title="Investment" />
            </a>

            {/* Quick Add */}
            <li className="text-xl space-x-5 font-semibold cursor-pointer px-4 py-2 hover:bg-gray-200 font-[Klavika-Medium]">
              <AddCircleOutlineOutlinedIcon />
              <span className="">Quick Add</span>
            </li>
          </ul>
          {/* End of UL */}
        </div>

        {/* Illustration */}
        <div className="flex justify-center items-center">
          <img
            src={SideBarIlu}
            alt="Sidebar_ilustration"
            className=" max-w-[90%] px-4"
          />
        </div>

        {/* Settings & Log out */}
        <ul className="text-xl mb-6  font-[Klavika-Medium]">
          <MenuItem Icon={SettingsOutlinedIcon} Title="Setting" />
          <MenuItem Icon={LoginOutlinedIcon} Title="Logout" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
