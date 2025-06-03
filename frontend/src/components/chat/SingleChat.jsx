import React, { use } from "react";
import { useSelectedChatStore, useUserStore } from "../../store/chatStore";
import { Box, Text, Center, Button, HStack } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { getSenderInfo, getSenderName } from "../../utils/chat/chat";
import ProfileModal from "./../user/ProfileModal";
import GroupChatModal from "../group/UpdateGroupChatModal";

const SingleChat = () => {
  const user = useUserStore((state) => state.user);
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );

  return (
    <Box w="100%" h="100%" p={6}>
      {selectedChat ? (
        <>
          <Text fontSize="2xl" fontWeight="bold">
            {/*  to display back button in base  */}
            <Button
              size={"lg"}
              display={{ base: "block", md: "none" }}
              onClick={() => setSelectedChat(null)}
            >
              <BiArrowBack />
            </Button>
            {/* Displaying chat name if group chat or sender name if individual chat */}
            {!selectedChat.isGroupChat ? (
              <HStack spacing={2}>
                <Text>{getSenderName(user, selectedChat.users)}</Text>
                <ProfileModal
                  displayText={false}
                  user={getSenderInfo(user, selectedChat.users)}
                />
              </HStack>
            ) : (
              <HStack spacing={2}>
                <Text>{selectedChat.chatName.toUpperCase()}</Text>
                <GroupChatModal displayText={false} />
              </HStack>
            )}
          </Text>
          <Box>
            {/* Placeholder for chat messages */}
            <Text mt={4} color="gray.500">
              Chat messages will be displayed here.
            </Text>
          </Box>
        </>
      ) : (
        <Center h="100%">
          <Text color="gray.400" fontSize="xl">
            Select a chat to start messaging.
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default SingleChat;
