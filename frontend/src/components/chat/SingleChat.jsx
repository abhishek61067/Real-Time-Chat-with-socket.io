import Lottie from "lottie-react";

import React, { useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useSelectedChatStore, useUserStore } from "../../store/chatStore";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useReadMessages, useSendMessage } from "../../api/message.js";
import ChatMessage from "../message/ChatMessage.jsx";
import io from "socket.io-client";
import EmptyChat from "./EmptyChat.jsx";
import ChatHeader from "./chatbox/ChatBoxHeader.jsx";
import MessageInput from "./chatbox/MessageInput.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BiSolidSticker } from "react-icons/bi";
import typingAnimation from "@/assets/animation/typing-animation.json";
import useNotificationStore from "./../../store/notificationStore";

const schema = yup.object().shape({
  message: yup.string().required("Message cannot be empty"),
});

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
socket = io(ENDPOINT);

const SingleChat = () => {
  const user = useUserStore((state) => state.user);
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );
  const chatId = selectedChat?._id;

  // for notification state
  const notification = useNotificationStore((state) => state.notification);
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { message: "" },
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const { data: messages } = useReadMessages(chatId);
  const { mutateAsync: sendMessage } = useSendMessage();

  const queryClient = useQueryClient();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // setup event to the socket
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.emit("join chat", chatId);
  }, [selectedChat]);

  useEffect(() => {
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // show notification
        if (!notification.some((msg) => msg._id === newMessageReceived._id)) {
          setNotification([newMessageReceived, ...notification]);
        }
      } else {
        // to update or replace the temporary message in the chat with real message
        queryClient.setQueryData(
          ["messages", newMessageReceived.chat._id],
          (old = []) => {
            // Add new message only if it doesn't already exist
            const exists = old.some(
              (msg) => msg._id === newMessageReceived._id
            );
            return exists ? old : [...old, newMessageReceived];
          }
        );
      }
    });
    // Clean up the event listener on unmount
    return () => {
      socket.off("message received");
    };
  });

  console.log(notification, "notification");

  const onSubmit = (data) => {
    // onsubmit, we will first update the UI optimistically using the temporary message and then send the message to the server and emit the socket event and then update the UI with the real message

    const chatId = selectedChat._id;
    const content = data.message;

    // optimistic ui
    // 1. Create a temporary message
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      content,
      chat: { _id: chatId },
      sender: user, // current user
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    // 2. Optimistically update UI in the sender's chat
    queryClient.setQueryData(["messages", chatId], (old = []) => [
      ...old,
      tempMessage,
    ]);

    // 3. Emit the temporary message to the socket to update the UI immediately in the receiver's chat
    socket.emit("new message", tempMessage);

    // 3. Send to server
    sendMessage({ content, chatId })
      .then((realMessage) => {
        // If successful, update the temporary message with the real message
        socket.emit("new message", realMessage);
        socket.emit("stop typing", chatId);
      })
      .catch(() => {
        // If failed, remove temporary message
        queryClient.setQueryData(["messages", chatId], (old = []) =>
          old.filter((msg) => msg._id !== tempMessage._id)
        );

        toast({
          title: "Error",
          description: "Failed to send message.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

    reset(); // Clear input
  };

  const typingHandler = (e) => {
    if (!socketConnected) return;
    // typer is not getting typing event because he is typing and if he is typing then we don't want to emit typing event
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Box w="100%" h="100%" p={6}>
      {selectedChat ? (
        <>
          <ChatHeader
            user={user}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <Box height={"50%"} overflow={"auto"}>
            <ChatMessage data={messages} />
          </Box>
          {/* showing typing indicator */}
          {isTyping ? (
            <Lottie
              animationData={typingAnimation}
              style={{
                width: "60px",
                height: "30px",
              }}
            />
          ) : (
            <></>
          )}
          <MessageInput
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            typingHandler={typingHandler}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </Box>
  );
};

export default SingleChat;
