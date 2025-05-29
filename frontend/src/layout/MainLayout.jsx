import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const MainLayout = () => (
  <Box minH="100vh" bg="gray.100">
    {/* You can add a navbar, sidebar, etc. here */}
    {/* let add navbar with login and chat route */}

    <Outlet />
  </Box>
);

export default MainLayout;
