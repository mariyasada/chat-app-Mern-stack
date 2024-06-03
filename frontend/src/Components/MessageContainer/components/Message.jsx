import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../zustand/useChat";
import { extractTime } from "../../../utils/extractTimeHandler";

const Message = ({ message }) => {
  const { loggedInUser } = useAuth();
  const { selectedConversation } = useChat();
  const formattedDate = extractTime(message?.createdAt);
  const fromMe = message?.senderId === loggedInUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-teal-400" : "bg-fuchsia-400";
  const profilePic = fromMe
    ? loggedInUser?.profilePic
    : selectedConversation?.profilePic;

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="message component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message?.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;
