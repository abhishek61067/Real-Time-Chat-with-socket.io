import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/chatStore";

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const initUser = useUserStore((state) => state.initUser);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserInitialized = initUser();
    if (!isUserInitialized) {
      setUser(null);
      navigate("/");
    }
  }, [initUser, setUser, navigate]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
