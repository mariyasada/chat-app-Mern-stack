import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import Conversations from "./components/Conversations";
import { useNavigate } from "react-router";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.post("/api/v1/users/logout");
      if (data?.statusCode === 200) {
        localStorage.removeItem("loggedIn-user");
        navigate("/");
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div className="border-r border-slate-200 p-4 flex flex-col w-1/3 relative max-[450px]:w-[180px]">
      <SearchInput />
      <Conversations />
      <button
        className="bg-gradient-to-r w-11/12  bottom-4 absolute from-pink-600 to-purple-400 hover:from-purple-500 hover:to-pink-400 text-white max-[450px]:bottom-2 w-10/12"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
