import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/chatStore";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = useUserStore((state) => state.user);
  const initUser = useUserStore((state) => state.initUser);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (!user) {
      navigate("/", { state: { from: pathname } });
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      navigate("/unauthorized", { state: { from: pathname } });
    }
  }, [user, allowedRoles, navigate, pathname]);

  if (!user) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return null;

  return children;
};

export default RoleProtectedRoute;
