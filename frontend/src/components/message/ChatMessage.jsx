import { Box } from "@chakra-ui/react";
import React from "react";
import { useUserStore } from "../../store/chatStore";

const ChatMessage = ({ data }) => {
  const user = useUserStore((state) => state.user);
  return (
    <>
      {data?.map((message) => (
        <Box
          key={message._id}
          display="flex"
          justifyContent={
            message.sender._id === user._id ? "flex-end" : "flex-start"
          }
          mb={2}
        >
          <Box
            bg={message.sender._id === user._id ? "blue.500" : "gray.200"}
            color={message.sender._id === user._id ? "white" : "black"}
            borderRadius="md"
            p={2}
          >
            {message.content}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ChatMessage;
