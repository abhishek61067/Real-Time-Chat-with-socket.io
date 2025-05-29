import { Link as RouterLink } from "react-router-dom";
import { HStack, Link, Box, Text, Avatar, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
      px={0}
      py={2}
      bg="rgba(255, 255, 255, 0.25)"
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
            <Avatar
              size="sm"
              src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
              name="Chat Logo"
              bg="pink.200"
            />
            <Text
              fontWeight="bold"
              fontSize="xl"
              color="teal.700"
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
            to="/"
            fontWeight="bold"
            fontSize="lg"
            color="teal.700"
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Login
          </Link>
          <Link
            as={RouterLink}
            to="/chat"
            fontWeight="bold"
            fontSize="lg"
            color="teal.700"
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            Chat
          </Link>
          <Link
            as={RouterLink}
            to="/about-us"
            fontWeight="bold"
            fontSize="lg"
            color="teal.700"
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            About Us
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
