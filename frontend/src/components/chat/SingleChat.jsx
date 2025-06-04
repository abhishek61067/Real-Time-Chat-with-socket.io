import React from "react";
import { useSelectedChatStore, useUserStore } from "../../store/chatStore";
import {
  Box,
  Text,
  Center,
  Button,
  HStack,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { getSenderInfo, getSenderName } from "../../utils/chat/chat";
import ProfileModal from "./../user/ProfileModal";
import GroupChatModal from "../group/UpdateGroupChatModal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useReadMessages, useSendMessage } from "../../api/message.js";
import ChatMessage from "../message/ChatMessage.jsx";

// Validation schema
const schema = yup.object().shape({
  message: yup.string().required("Message cannot be empty"),
});

const SingleChat = () => {
  const user = useUserStore((state) => state.user);
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );
  const chatId = selectedChat?._id;

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const { data: messages, isLoading, error } = useReadMessages(chatId);
  console.log("🚀 ~ SingleChat ~ data:", messages);

  const { mutateAsync: sendMessage } = useSendMessage();

  const onSubmit = (data) => {
    console.log("Sending message:", data.message);
    // Handle sending message here
    // e.g., sendMessage(data.message)

    const chatId = selectedChat._id;
    const content = data.message;
    sendMessage({ content, chatId })
      .then((data) => {
        console.log("Message sent successfully");
        console.log("sent message data:", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast({
          title: "Error",
          description: "Failed to send message.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    reset();
  };

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
          <Box height={"75%"} overflow={"auto"}>
            {/* Displaying messages */}
            <ChatMessage data={messages} />
          </Box>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.message}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Type a message..."
                    size="md"
                    mt={4}
                    {...field}
                  />
                )}
              />
              {errors.message && (
                <Text color="red.400" fontSize="sm" mt={1}>
                  {errors.message.message}
                </Text>
              )}
            </FormControl>
            {/* You can add a send button here if needed */}
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
