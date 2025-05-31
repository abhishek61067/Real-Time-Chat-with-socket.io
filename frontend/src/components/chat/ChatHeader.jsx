import { IoNotificationsOutline } from "react-icons/io5";
import {
  HStack,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Link,
  useColorModeValue,
  Badge,
  Box,
} from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { LuChevronDown } from "react-icons/lu";
import SideDrawer from "./SideDrawer";
import ProfileModal from "../user/ProfileModal";
import { useUserStore } from "../../store/chatStore";
import { Link as RouterLink } from "react-router-dom";

const ChatHeader = () => {
  const user = useUserStore((state) => state.user);

  // Example: notification count (replace with your actual logic)
  const notificationCount = 3;

  // Use color mode values for background and text
  const containerBg = useColorModeValue("white.100", "dark.800");
  const textColor = useColorModeValue("dark.800", "white.100");

  return (
    <HStack
      shadow="md"
      p={4}
      bg={containerBg}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      justify="space-between"
    >
      <SideDrawer />
      <Text fontSize="3xl" fontWeight="bold" color={textColor}>
        Chat Application
      </Text>
      <HStack spacing={4}>
        <Menu>
          <MenuButton position="relative">
            <Box position="relative" display="inline-block">
              <IoNotificationsOutline size={28} />
              {notificationCount > 0 && (
                <Badge
                  bg={"red.700"}
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  fontSize="0.7em"
                  px={2}
                  py={0.5}
                  zIndex={1}
                  color={"white"}
                >
                  {notificationCount}
                </Badge>
              )}
            </Box>
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton rightIcon={<LuChevronDown />}>
            <Avatar
              bg={"teal.100"}
              size="md"
              src={user?.pic}
              cursor="pointer"
              name={user?.name ?? "Abhi"}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <ProfileModal user={user} />
            </MenuItem>
            <MenuItem>
              <Link w={"full"} as={RouterLink} to="/logout">
                Logout
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default ChatHeader;
