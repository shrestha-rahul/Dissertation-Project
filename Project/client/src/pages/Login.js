import React, { useState, useEffect } from "react";
import logoTwo from "../assets/LogoTwo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const UserInfo = localStorage.getItem("user");
    const value = JSON.parse(UserInfo);
    if (value != null) {
      navigate("/home");
    }
  }, []);

  const SignIn = () => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios.post("http://127.0.0.1:5000/signin", data).then((res) => {
      if (res.data.loggedIn) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.user.user_id,
            name: res.data.user.username,
            email: res.data.user.email,
            DOB: res.data.user.DOB,
            phone: res.data.user.phone,
          })
        );
        navigate("/home");
      }
    });
  };
  return (
    <div className="flex w-screen items-center flex-col font-[Klavika-Medium]">
      <h3 className="text-3xl md:mt-10">Welcome Back</h3>
      <p className="text-lg">
        intellegent Income and Expenditure Management System
      </p>
      <img src={logoTwo} alt="" className="w-[120px] mt-3 mb-3" />
      <div className="flex items-center flex-col w-96">
        {/* Email Field */}
        <div className="flex border-[1px] border-slate-500 w-80 h-9 mt-3">
          <div className="bg-black w-20 flex justify-center items-center">
            <p className="text-white text-xs">EMAIL</p>
          </div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            className="flex grow outline-none pl-2 bg-white"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => {
            SignIn();
          }}
          className="bg-[#050416] px-12 py-1 mt-10 mb-3 rounded-full text-white"
        >
          Log In
        </button>
        <p>Don't have an account?</p>
        <Link to="/register">
          <button className="bg-[#050416] px-12 py-1 rounded-full text-white">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
