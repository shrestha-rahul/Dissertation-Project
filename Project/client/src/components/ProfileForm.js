import React from "react";
import ProfileFormItem from "./ProfileFormItem";

function ProfileForm() {
  return (
    <div className="w-full pb-6 border-b-2 border-[#161837]">
      <form action="" className="space-y-2">
        <ProfileFormItem title="Name" />
        <ProfileFormItem title="D.O.B" />
        <ProfileFormItem title="Phone" />
        <ProfileFormItem title="Adress" />
      </form>
    </div>
  );
}

export default ProfileForm;
