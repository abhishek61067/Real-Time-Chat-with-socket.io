import { IoNotificationsOutline } from "react-icons/io5";
import {
  HStack,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { LuChevronDown } from "react-icons/lu";
import SideDrawer from "./SideDrawer";
import ProfileModal from "../user/ProfileModal";
import { useUserStore } from "../../store/chatStore";

const ChatHeader = () => {
  const user = useUserStore((state) => state.user);

  return (
    <HStack
      shadow="md"
      p={4}
      bgGradient="linear(to-r, teal.50, purple.50, teal.50)"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      justify="space-between"
    >
      <SideDrawer />
      <Text fontSize="3xl" fontWeight="bold">
        Chat Application
      </Text>
      <HStack spacing={4}>
        <Menu>
          <MenuButton>
            <IoNotificationsOutline size={24} />{" "}
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton rightIcon={<LuChevronDown />}>
            <Avatar
              bg={"pink.100"}
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
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default ChatHeader;
