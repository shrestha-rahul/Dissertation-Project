import React, { useState } from "react";
import logoTwo from "../assets/LogoTwo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../server_conf";

function Registration() {
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SignUp = async () => {
    await axios.post(`${SERVER_URL}/signup`, {
      "username": fullname,
      "phone": phone,
      "DOB": DOB,
      "email": email,
      "password": password
    }).then((res) => {
      if (res.data.registered === true) {
        navigate("/");
      }
    });
  };
  return (
    <div className="flex w-screen items-center flex-col font-[Klavika-Medium]">
      <h3 className="text-3xl md:mt-10">
        Welcome to the <b>IIEM</b>
      </h3>
      <p className="text-lg">
        intellegent Income and Expenditure Management System
      </p>
      <img src={logoTwo} alt="" className="w-[120px] mt-3 mb-3" />
      <div className="flex items-center flex-col w-96">
        {/* Name Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">FULL NAME</p>
          </div>
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="flex grow bg-white outline-none pl-2"
            placeholder="Rahul Shrestha"
          />
        </div>

        {/* Phone Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9 mt-3">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">PHONE</p>
          </div>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="flex grow bg-white outline-none pl-2"
            placeholder="077745678"
          />
        </div>

        {/* DOB Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9 mt-3">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">D.O.B</p>
          </div>
          <input
            type="text"
            onChange={(e) => setDOB(e.target.value)}
            className="flex grow bg-white outline-none pl-2"
            placeholder="25/02/1999"
          />
        </div>

        {/* Email Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9 mt-3">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">EMAIL</p>
          </div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="flex grow bg-white outline-none pl-2"
            placeholder="test@gmail.com"
          />
        </div>

        {/* Password Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9 mt-3">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">PASSWORD</p>
          </div>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className="flex grow outline-none pl-2 bg-white"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => SignUp()}
          className="bg-[#050416] px-12 py-1 mt-10 mb-3 rounded-full text-white active:scale-125"
        >
          Sign Up
        </button>
        <p>Already have an account?</p>
        <Link to="/">
          <button className="bg-[#050416] px-12 py-1 rounded-full text-white">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Registration;
