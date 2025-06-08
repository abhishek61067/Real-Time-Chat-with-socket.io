import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useUserStore } from "../store/chatStore";
import { useEffect } from "react";

const MainLayout = () => {
  const bg = useColorModeValue("white.100", "dark.800");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
