import { useEffect } from "react";
import { useUserStore } from "@/store/chatStore";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";

const UserInitWrapper = ({ children }) => {
  const initUser = useUserStore((state) => state.initUser);
  const loading = useUserStore((state) => state.loading);
  const bg = useColorModeValue("white.100", "dark.800");

  useEffect(() => {
    initUser();
  }, [initUser]);

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg={bg}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  return children;
};

export default UserInitWrapper;
