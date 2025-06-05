import { Box, Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useUserStore } from "../../store/chatStore";

const ChatMessage = ({ data }) => {
  const user = useUserStore((state) => state.user);
  return (
    <Box p={2}>
      {data?.map((message) => {
        const isSelf = message.sender._id === user._id;
        return (
          <Box
            key={message._id}
            display="flex"
            justifyContent={isSelf ? "flex-end" : "flex-start"}
            alignItems="flex-end"
            mb={2}
          >
            {!isSelf && (
              <Tooltip label={message.sender.name}>
                <Avatar
                  src={
                    message.sender.pic?.startsWith("http")
                      ? message.sender.pic
                      : message.sender.pic
                      ? `data:image;base64,${message.sender.pic}`
                      : undefined
                  }
                  name={message.sender.name}
                  size="sm"
                  mr={2}
                />
              </Tooltip>
            )}
            <Box
              bg={isSelf ? "blue.500" : "gray.200"}
              color={isSelf ? "white" : "black"}
              borderRadius="md"
              p={2}
              maxW="70%"
            >
              {message.content}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatMessage;
