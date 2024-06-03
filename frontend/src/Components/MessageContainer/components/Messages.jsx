import React, { useRef, useEffect } from "react";
import { MessageLoader } from "../../../Loaders/MessageLoader";
import Message from "./Message";
import { useGetMessage } from "../../../dataAccess/getMessage";
import useListenMessage from "../../../dataAccess/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto max-h-max hide-scrollbar">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageLoader key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center mt-6 text-gray-600">
          Send a message to start the conversation 🌼🌼🌻
        </p>
      )}
    </div>
  );
};

export default Messages;
