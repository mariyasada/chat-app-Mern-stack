import { useEffect, useState } from "react";
import { useChat } from "../zustand/useChat";
import { toast } from "react-toastify";
import axios from "axios";

export const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useChat();

  useEffect(() => {
    const getAllMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `api/v1/messages/getmessage/${selectedConversation?._id}`
        );
        // if (data?.data.length === 0) toast.success("there is no conversation");
        setMessages(data?.data);
      } catch (err) {
        console.error(err); // Log the error for debugging
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getAllMessages();
    }
  }, [setMessages, selectedConversation?._id]);
  return { loading, messages };
};
