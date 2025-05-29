import { useEffect } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/chatStore";

const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    // Optionally, show a message for a moment before redirecting
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <Box
      minH="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" color="teal.500" mb={4} />
      <Text fontSize="xl" color="teal.700">
        Logging out...
      </Text>
    </Box>
  );
};

export default Logout;
