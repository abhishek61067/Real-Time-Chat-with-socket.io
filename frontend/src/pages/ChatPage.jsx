import React from "react";
import { useChats } from "../api/chat";
import Loader from "./../components/ui/loader";
import Error from "./../components/ui/error";

const ChatPage = () => {
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} />;

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
