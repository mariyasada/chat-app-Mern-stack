import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSendMessage } from "../../../dataAccess/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="py-4 my-0" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="input input-accent  border text-sm rounded-lg mx-3 block  p-4 bg-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-2 flex items-center"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend color="white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
