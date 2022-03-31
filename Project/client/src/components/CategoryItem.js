import React from "react";

function CategoryItem({ image }) {
  return (
    <div className="border-2 border-[#161837] rounded-lg">
      <img src={image} alt="" />
    </div>
  );
}

export default CategoryItem;
