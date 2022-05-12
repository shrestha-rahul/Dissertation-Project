import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images
import Logo from "../assets/Logo.svg";
import MenuItem from "./menuItem.js";
import SideBarIlu from "../assets/sidebar_ilu.svg";
import { useNavigate } from "react-router-dom";

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
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopUp] = useState(false);
  const QuickAdd = () => {
    setShowPopUp(true);
  };

  const closePopup = () => {
    setShowPopUp(false);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
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

            <a href="/home" className="text-xl mb-6  font-[Klavika-Medium]">
              <MenuItem Icon={HomeOutlinedIcon} Title="Home" />
            </a>

            {/* Stock */}

            <a href="/stock " className="text-xl mb-6  font-[Klavika-Medium]">
              <MenuItem Icon={BarChartOutlinedIcon} Title="Investment" />
            </a>

            {/* Quick Add */}
            <li
              onClick={() => QuickAdd()}
              className="text-xl space-x-5 font-semibold cursor-pointer px-4 py-2 hover:bg-gray-200 font-[Klavika-Medium]"
            >
              <AddCircleOutlineOutlinedIcon />
              <span className="">Quick Add</span>
            </li>
          </ul>
          {/* End of UL */}
        </div>
        {showPopup ? (
          <div className="absolute bg-[#161837] w-[500px] h-[300px] top-20 left-48 z-50 rounded-xl">
            <Link to="/add_transaction">
              <div className="absolute flex items-center bg-white w-80 h-10 rounded-full left-24 top-8">
                <AddCircleIcon className="text-[#161837] ml-3" />
                <h1 className="text-xl font-[Klavika-Medium] font-bold text-[#161837] ml-6">
                  Add Transaction
                </h1>
              </div>
            </Link>
            <Link to="#">
              <div className="absolute bg-white flex items-center w-80 h-10 rounded-full left-24 top-24">
                <AddCircleIcon className="text-[#161837] ml-3" />
                <h1 className="text-xl font-[Klavika-Medium] font-bold text-[#161837] ml-6">
                  Add Income
                </h1>
              </div>
            </Link>
            <Link to="/add_reminder">
              <div className="absolute flex items-center bg-white w-80 h-10 rounded-full left-24 top-40">
                <AddCircleIcon className="text-[#161837] ml-3" />
                <h1 className="text-xl font-[Klavika-Medium] font-bold text-[#161837] ml-6">
                  Add New Bill Reminder
                </h1>
              </div>
            </Link>
            <Link to="/add_budget">
              <div className="absolute bg-white flex items-center w-80 h-10 rounded-full left-24 top-56">
                <AddCircleIcon className="text-[#161837] ml-3" />
                <h1 className="text-xl font-[Klavika-Medium] font-bold text-[#161837] ml-6">
                  Add New Budget
                </h1>
              </div>
            </Link>
            <div className="w-14 h-14 rounded-full absolute top-28 -left-8 flex items-center justify-center bg-[#161837]">
              <div
                onClick={() => closePopup()}
                className="w-10 h-10 rounded-full cursor-pointer bg-white flex justify-center items-center"
              >
                <CloseIcon />
              </div>
            </div>
          </div>
        ) : null}

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
          <div
            className="cursor-pointer"
            onClick={() => {
              Logout();
            }}
          >
            <MenuItem Icon={LoginOutlinedIcon} Title="Logout" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
