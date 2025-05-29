import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import Loader from "../components/loader";
import Error from "../components/error";
import { useUserStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import { useChats } from "../api/chat";
import ChatHeader from "../components/chat/ChatHeader";
import MyChat from "../components/chat/MyChat";
import ChatBox from "../components/chat/ChatBox";

const ChatPage = () => {
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (!chats || chats.length === 0) return <div>No chats available</div>;

  return (
    <Box height={"100vh"}>
      <ChatHeader />
      <HStack spacing={4} justifyContent="space-between" m={4}>
        <MyChat />
        <ChatBox />
      </HStack>
    </Box>
  );
};

export default ChatPage;
