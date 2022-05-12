import React from "react";

import changeProfile from "../assets/changeprofile.svg";
import profilePic from "../assets/profile.jpg";

function ProfileAvatar({ name }) {
  return (
    <div>
      <div className="py-2 flex flex-col justify-center items-center">
        <div className="relative flex w-fit">
          <img src={profilePic} alt="" className="rounded-[49px]" />
          <div className="w-[30px] h-[30px] bg-[#030416] flex items-center justify-center rounded-full absolute right-2 bottom-0 p-2 cursor-pointer">
            <img src={changeProfile} alt="" />
          </div>
        </div>
        <span className="text-xl font-bold text-center mt-1">{name}</span>
      </div>
    </div>
  );
}

export default ProfileAvatar;
