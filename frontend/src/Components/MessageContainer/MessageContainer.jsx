import React, { useEffect } from "react";
import NoChat from "./components/NoChat";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import { useChat } from "../../zustand/useChat";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useChat();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="h-full w-full flex flex-col">
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <div className="flex gap-5 py-4 px-10 mb-2 items-start bg-purple-50 shadow-sm rounded-sm">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={selectedConversation?.profilePic} alt="user avatar" />
              </div>
            </div>
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
