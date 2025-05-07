import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ChatPage from "./pages/ChatPage.jsx";

// api
const queryClient = new QueryClient();

// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
