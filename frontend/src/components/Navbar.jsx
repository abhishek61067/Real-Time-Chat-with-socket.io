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
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import ChatLogo from "@/assets/logo/chat.svg";
import routes from "../routes/constant";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { label: "Login", to: routes.LOGIN },
    { label: "Chat", to: "/chat" },
    { label: "About Us", to: "/about-us" },
    { label: "Admin Panel", to: "/admin-panel" },
    { label: "Logout", to: "/logout" },
  ];

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
        {/* Logo and App Name */}
        <Link as={RouterLink} to="/">
          <HStack spacing={2}>
            <Image boxSize={12} src={ChatLogo} alt="Chat Logo" />
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

        {/* Desktop Nav */}
        <HStack
          spacing={8}
          display={{ base: "none", md: "flex" }}
          align="center"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              as={RouterLink}
              to={item.to}
              fontWeight="bold"
              fontSize="lg"
              color={colorMode === "dark" ? "teal.200" : "teal.700"}
              _hover={{ color: "purple.500", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "dark" ? "gray.800" : "white"}>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={6} mt={12} align="start">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  as={RouterLink}
                  to={item.to}
                  fontWeight="bold"
                  fontSize="lg"
                  color={colorMode === "dark" ? "teal.200" : "teal.700"}
                  _hover={{ color: "purple.500", textDecoration: "none" }}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}

              <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
