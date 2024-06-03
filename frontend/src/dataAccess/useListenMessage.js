import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useChat } from "../zustand/useChat";
import notificationSound from "../../public/sounds/notification.mp3";

const useListenMessage = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useChat();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
