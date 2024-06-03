import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { LuMessagesSquare } from "react-icons/lu";

const NoChat = () => {
  const { loggedInUser } = useAuth();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {loggedInUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <LuMessagesSquare className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default NoChat;
