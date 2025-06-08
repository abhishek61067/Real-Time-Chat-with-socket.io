import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useUserStore } from "../store/chatStore";
import { useEffect } from "react";

const MainLayout = () => {
  const initUser = useUserStore((state) => state.initUser);
  const loading = useUserStore((state) => state.loading);

  useEffect(() => {
    initUser();
  }, [initUser]);

  const bg = useColorModeValue("white.100", "dark.800");

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
  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
