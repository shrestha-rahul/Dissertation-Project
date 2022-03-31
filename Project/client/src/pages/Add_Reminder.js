import React from "react";
import close from "../assets/close.svg";
import logoTwo from "../assets/LogoTwo.svg";

function Add_Reminder() {
  return (
    <>
      <div className="bg-white top-[0] bottom-[0] right-[0] left-[0] z-50">
        <div className="fixed p-6 items-center justify-center bg-white top-[50px] bottom-[50px] right-[50px] left-[50px] rounded-[50px] border-2 border-gray-800 space-y-4 bg-[url('https://i.ibb.co/28Z2fjN/bg-add.png')] bg-no-repeat bg-bottom">
          <div className="flex justify-center items-center space-x-2">
            <img src={logoTwo} alt="" className="w-[100px]" />
            <h1 className="text-[50px] underline underline-offset-8 font-[Klavika-Medium]">
              Add New Reminder
            </h1>
            <div className="absolute top-[50px] right-[50px] cursor-pointer">
              <img src={close} alt="" />
            </div>
          </div>

          {/* From */}
          <form
            action=""
            className="mx-auto flex flex-col items-center justify-center font-[Klavika-Light]"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-[Klavika-Medium]"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="border-2 border-gray-800 w-[300px]"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-[Klavika-Medium]"
              >
                Category:
              </label>
              <select
                name="category"
                id="cars"
                className="border-2 border-gray-800 w-[300px]"
              >
                <option value="transport">Transport</option>
                <option value="food">Food</option>
                <option value="alcohol">Alcohol</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-lg font-[Klavika-Medium]"
              >
                Due Date:
              </label>
              <input
                type="date"
                id="name"
                className="border-2 border-gray-800 w-[300px]"
              />
            </div>
            <div>
              <label
                htmlFor="amoun"
                className="block text-lg font-[Klavika-Medium]"
              >
                Amount:
              </label>
              <input
                type="text"
                id="name"
                placeholder="£70"
                className="border-2 border-gray-800 w-[300px]"
              />
            </div>
          </form>
          {/* End Form */}

          {/* Buttons */}
          <div className="mx-auto flex items-center space-x-4 justify-center pb-4 border-b-2 border-gray-800 max-w-[50%]">
            <div className="px-8 py-2 rounded-[24px] bg-black text-white text-[25px] font-[Klavika-Medium]">
              ADD
            </div>
            <div className="text-[25px] font-[Klavika-Medium]">Cancel</div>
          </div>
          {/* End Buttons */}
        </div>
      </div>
    </>
  );
}

export default Add_Reminder;
