import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const MainLayout = () => (
  <Box minH="100vh" bgGradient="linear(to-br, teal.100, purple.100, pink.100)">
    <Navbar />
    <Outlet />
    <Footer />
  </Box>
);

export default MainLayout;
