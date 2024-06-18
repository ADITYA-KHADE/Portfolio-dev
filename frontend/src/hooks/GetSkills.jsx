import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getconversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/all");
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

      setLoading(false);
    };

    getconversation();
  }, []);

//   console.log(conversations);

  return { conversations, loading };
};

export default useGetConversations;
