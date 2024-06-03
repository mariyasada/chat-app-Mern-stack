import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });
  const [ispasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginUserData((prev) => ({ ...prev, [name]: value }));
  };

  const loginHanlder = async () => {
    try {
      const { password, email } = loginUserData;
      if ([email, password].some((field) => field?.trim() === "")) {
        toast.error("All fields are required!");
      }
      setLoading(true);
      const response = await axios.post("/api/v1/users/login", loginUserData);
      if (response.status === 200) {
        const userData = response.data.data.user;
        localStorage.setItem("loggedIn-user", JSON.stringify(userData));
        setLoggedInUser(userData);
        setLoading(false);
        navigate("/home");
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex bg-slate-50 flex-col gap-3 px-10 py-7 h-full w-full rounded-3xl shadow-lg relative max-sm:w-full h-fit max-md:w-full h-fit">
      <p className="text-2xl  text-fuchsia-800 font-bold text-center">
        Welcome Back !!
      </p>
      <div className="flex flex-col gap-1 items-start ">
        <label className="text-fuchsia-600  font-bold ">Email</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          name="email"
          value={loginUserData.email}
          id="email"
          onChange={onChangeHandler}
        />
      </div>

      <div className="flex flex-col gap-1 relative items-start">
        <label className="text-fuchsia-600  font-bold">Password</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          name="password"
          value={loginUserData.password}
          id="password"
          onChange={onChangeHandler}
          type={ispasswordVisible ? "text" : "password"}
        />
      </div>
      <div className="flex w-full justify-center gap-28 items-center max-sm:w-full">
        <p className="text-md text-fuchsia-900">Don't have an account?</p>
        <a
          className="text-fuchsia-500  font-bold cursor-pointer underline underline-offset-4"
          onClick={() => navigate("/signup")}
        >
          Register here
        </a>
      </div>
      <span className="absolute  cursor-pointer passwordIcon">
        {!ispasswordVisible ? (
          <FaEyeSlash
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            color="black"
          />
        ) : (
          <FaEye
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            color="black"
          />
        )}
      </span>
      <div className="flex flex-col gap-1 items-center justify-center w-full mt-2">
        <button
          className="w-full shadow-2xl bg-gradient-to-r from-pink-600 to-purple-400 hover:from-purple-500 hover:to-pink-400 p-2 text rounded-md w-1/2 text-white font-bold"
          onClick={loginHanlder}
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
