import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/chatStore";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const pathname = location.pathname;
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      hasShownToast.current = true;
      toast({
        title: "Unauthorized",
        description: "You must be logged in to access this page.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setTimeout(() => {
        navigate("/", { state: { from: pathname } });
      }, 100);
    }
  }, [user, navigate, pathname, toast]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
