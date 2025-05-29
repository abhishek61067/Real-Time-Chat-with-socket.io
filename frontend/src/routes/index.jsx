import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import App from "../App";
import ChatPage from "../pages/ChatPage";
import routes from "./constant";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute.jsx";
import UnAuthorized from "../pages/UnAuthorized.jsx";
import Logout from "./../pages/Logout";

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
      {
        path: routes.UNAUTHORIZED,
        element: <UnAuthorized />,
      },
      {
        path: routes.LOG_OUT,
        element: <Logout />,
      },
    ],
  },
  {
    path: "about-us",
    element: <div>About us</div>,
  },
  {
    path: "admin-panel",
    element: (
      <ProtectedRoute>
        <RoleProtectedRoute allowedRoles={["admin"]}>
          <div>Admin</div>
        </RoleProtectedRoute>
      </ProtectedRoute>
    ),
  },
]);
