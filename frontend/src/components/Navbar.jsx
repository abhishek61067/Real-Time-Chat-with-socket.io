import { Link as RouterLink } from "react-router-dom";
import {
  HStack,
  Link,
  Box,
  Text,
  Avatar,
  Flex,
  IconButton,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ChatLogo from "@/assets/logo/chat.svg"; // Assuming you have a logo image
import routes from "../routes/constant";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
      px={0}
      py={2}
      bg={colorMode === "dark" ? "gray.800" : "transparent"}
      boxShadow="lg"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <Flex align="center" justify="space-between" maxW="7xl" mx="auto" px={8}>
        {/* Logo and App Name on the left */}
        <Link as={RouterLink} to="/">
          <HStack spacing={2}>
            <Image boxSize={12} src={ChatLogo} name="Chat Logo" />
            <Text
              fontWeight="bold"
              fontSize="xl"
              color={colorMode === "dark" ? "teal.200" : "teal.700"}
              letterSpacing="wide"
              userSelect="none"
            >
              ChatApp
            </Text>
          </HStack>
        </Link>
        {/* Nav items on the right */}
        <HStack spacing={8}>
          <Link
            as={RouterLink}
            to={routes.LOGIN}
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "dark" ? "teal.200" : "teal.700"}
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Login
          </Link>
          <Link
            as={RouterLink}
            to="/chat"
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "dark" ? "teal.200" : "teal.700"}
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Chat
          </Link>
          <Link
            as={RouterLink}
            to="/about-us"
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "dark" ? "teal.200" : "teal.700"}
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            About Us
          </Link>
          <Link
            as={RouterLink}
            to="/admin-panel"
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "dark" ? "teal.200" : "teal.700"}
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Admin Panel
          </Link>
          {/* logout */}
          <Link
            as={RouterLink}
            to="/logout"
            fontWeight="bold"
            fontSize="lg"
            color={colorMode === "dark" ? "teal.200" : "teal.700"}
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Logout
          </Link>
          {/* Dark mode toggle button */}
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
