import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAuth = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(null);
  useEffect(() => {
    fetchProtected();
  }, []);
    
  const fetchProtected = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/protected",
        { withCredentials: true }
      );
      if (response) {
        setIsAuthenticate(true);
      }
    } catch (error) {
      setIsAuthenticate(false);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };
  return isAuthenticate;
};

export default useAuth