import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import App from "../App";
import ChatPage from "../pages/ChatPage";
import routes from "./constant";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: routes.HOME,
        element: <App />,
      },
      {
        path: routes.CHAT,
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "about-us",
    element: <div>About us</div>,
  },
]);
