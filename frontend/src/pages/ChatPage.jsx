import { IoIosNotifications } from "react-icons/io";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useChats } from "../api/chat";
import Loader from "../components/loader";
import Error from "../components/error";
import { useUserStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import SideDrawer from "../components/chat/SideDrawer";
import MyChat from "../components/chat/MyChat";
import ChatBox from "../components/chat/ChatBox";
import { LuChevronDown } from "react-icons/lu";
import ProfileModal from "../components/user/ProfileModal";

const ChatPage = () => {
  const user = useUserStore((state) => state.user);
  // const isUserLoggedIn = isUserLoggedIns();
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} />;

  if (!chats || chats.length === 0) return <div>No chats available</div>;

  return (
    <Box>
      {/* <h1>Chat List</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>{chat.chatName}</li>
        ))}
      </ul> */}
      <HStack
        shadow={"lg"}
        p={4}
        bg={"white"}
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        justify={"space-between"}
      >
        <SideDrawer />
        <Text fontSize="2xl" fontWeight="bold">
          Chat Application
        </Text>
        {/* menu for notification */}
        <HStack spacing={4}>
          <Menu>
            <MenuButton>
              <IoIosNotifications size={24} />{" "}
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton rightIcon={<LuChevronDown />}>
              <Avatar
                size="md"
                cursor="pointer"
                name={user?.name ?? "Codeek"}
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
      <HStack spacing={4} justifyContent="space-between" m={4}>
        <MyChat />
        <ChatBox />
      </HStack>
    </Box>
  );
};

export default ChatPage;
