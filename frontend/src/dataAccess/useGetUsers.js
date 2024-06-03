import { useEffect, useState } from "react";
import { useChat } from "../zustand/useChat";
import axios from "axios";
import { toast } from "react-toastify";

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getallUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/allusers");
        setConversations(data?.data);
      } catch (error) {
        console.error(err); // Log the error for debugging
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getallUsers();
  }, []);

  return { loading, conversations };
};
