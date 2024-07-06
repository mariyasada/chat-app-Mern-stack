import React from "react";
import { useChat } from "../../../zustand/useChat";
import { useSocket } from "../../../context/SocketContext";

const SingleUser = ({ user, lastIndex }) => {
  const { setSelectedConversation, selectedConversation } = useChat();
  const isUserSelected = selectedConversation?._id === user?._id;
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers?.includes(user?._id);
  return (
    <>
      <div
        className={`${
          isUserSelected ? "bg-fuchsia-200" : ""
        } flex gap-8 w-full items-center hover:bg-fuchsia-100 rounded p-2 py-3 cursor-pointer max-[450px]:gap-2`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full max-[450px]:w-6">
            <img src={user?.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-800 text-lg max-[450px]:text-sm">
              {user?.fullName}
            </p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0" />}
    </>
  );
};

export default SingleUser;
