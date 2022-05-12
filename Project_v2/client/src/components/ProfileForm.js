import React from "react";
import ProfileFormItem from "./ProfileFormItem";

function ProfileForm({ name, DOB, email, phone }) {
  return (
    <div className="w-full pb-6 border-b-2 border-[#161837]">
      <form action="" className="space-y-2">
        <ProfileFormItem value={name} title="Name" />
        <ProfileFormItem value={DOB} title="D.O.B" />
        <ProfileFormItem value={phone} title="Phone" />
        <ProfileFormItem value={email} title="Adress" />
      </form>
    </div>
  );
}

export default ProfileForm;
