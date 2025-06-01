import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import Loader from "../components/loader";
import Error from "../components/error";
import { useUserStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import { useReadChat } from "../api/chat";
import ChatHeader from "../components/chat/ChatHeader";
import MyChat from "../components/chat/MyChatList";
import ChatBox from "../components/chat/ChatBox";
import MyChatList from "../components/chat/MyChatList";

const ChatPage = () => {
  return (
    <Box height={"100vh"}>
      <ChatHeader />
      <HStack spacing={4} justifyContent="space-between" m={4}>
        <MyChatList />
        <ChatBox />
      </HStack>
    </Box>
  );
};

export default ChatPage;
