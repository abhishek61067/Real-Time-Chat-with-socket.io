import { use, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/chatStore";

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const initUser = useUserStore((state) => state.initUser);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  // to catch the path before redirecting to the login page
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  useEffect(() => {
    const isUserInitialized = initUser();
    if (!isUserInitialized) {
      setUser(null);
      navigate("/", { state: { from: pathname } });
    }
  }, [initUser, setUser, navigate]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
