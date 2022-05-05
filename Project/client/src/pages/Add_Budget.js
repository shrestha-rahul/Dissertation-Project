import React, { useState } from "react";
import close from "../assets/close.svg";
import logoTwo from "../assets/LogoTwo.svg";
import axios from "axios";
import { Link } from "react-router-dom";

function Add_Budget() {
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");

  const AddBudget = () => {
    const data = new FormData();
    data.append("budget_category", category);
    data.append("budget_duration", duration);
    data.append("amount", amount);

    axios.post("http://127.0.0.1:5000/add_budget", data);
  };
  return (
    <>
      <div className="bg-white top-[0] bottom-[0] right-[0] left-[0] z-50">
        <div className="fixed p-6 items-center justify-center bg-white top-[50px] bottom-[50px] right-[50px] left-[50px] rounded-[50px] border-2 border-gray-800 space-y-4 bg-[url('https://i.ibb.co/28Z2fjN/bg-add.png')] bg-no-repeat bg-bottom">
          <div className="flex justify-center items-center space-x-2">
            <img src={logoTwo} alt="" className="w-[100px]" />
            <h1 className="text-[50px] underline underline-offset-8 font-[Klavika-Medium]">
              Add New Budget
            </h1>
            <Link to="/">
              <div className="absolute top-[50px] right-[50px] cursor-pointer">
                <img src={close} alt="" />
              </div>
            </Link>
          </div>

          {/* From */}
          <form
            action=""
            className="mx-auto flex flex-col items-center justify-center  font-[Klavika-Light]"
          >
            {/* Category */}
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
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="border-2 border-gray-800 w-[300px]"
              >
                <option value="Transport">Transport</option>
                <option value="Food">Food</option>
                <option value="Alcoholic Beverages">
                  Alcoholic Beverages & Tobacco
                </option>
                <option value="Clothing & Footwear">Clothing & Footwear</option>
                <option value="Reacreation & Culture">
                  Reacreation & Culture
                </option>
                <option value="Health">Health</option>
                <option value="Housing & Utilities">Housing & Utilities</option>
                <option value="Educational Services">
                  Educational Services
                </option>
                <option value="Communication">Communication</option>
                <option value="Income">Income</option>
              </select>
            </div>
            {/* End Cateogry */}

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-lg font-[Klavika-Medium]"
              >
                Duration:
              </label>
              <select
                name="duration"
                id="duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                className="border-2 border-gray-800 w-[300px]"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            {/* End Duration */}
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
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="£70"
                className="border-2 border-gray-800 w-[300px]"
              />
            </div>
          </form>
          {/* End Form */}

          {/* Buttons */}
          <div className="mx-auto flex items-center space-x-4 justify-center pb-4 border-b-2 border-gray-800 max-w-[50%]">
            <div
              onClick={() => {
                AddBudget();
              }}
              className="px-8 py-2 rounded-[24px] bg-black text-white text-[25px] font-[Klavika-Medium] cursor-pointer"
            >
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

export default Add_Budget;
