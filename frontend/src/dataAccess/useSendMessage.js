import { useState } from "react";
import { useChat } from "../zustand/useChat";
import { toast } from "react-toastify";
import axios from "axios";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useChat();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/v1/messages/sendmessage/${selectedConversation?._id}`,
        { message }
      );

      setMessages([...messages, data?.data]);
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};
