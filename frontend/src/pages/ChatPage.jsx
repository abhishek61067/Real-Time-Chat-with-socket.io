import React from "react";
import { useChats } from "../api/chat";

const ChatPage = () => {
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) return <div>Loading chats...</div>;

  if (error) return <div>Error loading chats: {error.message}</div>;

  if (!chats || chats.length === 0) return <div>No chats available</div>;

  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>{chat.chatName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
