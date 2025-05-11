import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "../pages/ChatPage";
import routes from "./constant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
]);
