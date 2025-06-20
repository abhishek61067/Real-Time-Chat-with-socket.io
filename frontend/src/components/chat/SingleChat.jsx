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
      console.log("Socket connected");
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
        // notification
      } else {
        queryClient.setQueryData(
          ["messages", newMessageReceived.chat._id],
          (old = []) => [...old, newMessageReceived]
        );
      }
    });
    // Clean up the event listener on unmount
    return () => {
      socket.off("message received");
    };
  }, [queryClient]);

  const onSubmit = (data) => {
    const chatId = selectedChat._id;
    const content = data.message;
    sendMessage({ content, chatId })
      .then((data) => {
        socket.emit("new message", data);
        socket.emit("stop typing", chatId);
        reset();
      })
      .catch(() => {
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

  const typingHandler = (e) => {
    console.log("typing: ", e.target.value);
    if (!socketConnected) return;
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
        console.log("we are inside setting type to false");
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
                width: "50px",
                height: "20px",
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
