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

const ChatPage = () => {
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
      <Box
        shadow={"lg"}
        p={4}
        bg={"white"}
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <SideDrawer />
      </Box>
      <HStack spacing={4} justifyContent="space-between" m={4}>
        <MyChat />
        <ChatBox />
      </HStack>
    </Box>
  );
};

export default ChatPage;
