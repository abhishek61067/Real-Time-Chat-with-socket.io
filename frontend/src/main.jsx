import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatPage from "./pages/ChatPage";
import { router } from "./routes/index";
import { theme } from "./theme/theme";
import UserInitWrapper from "./components/auth/UserInitWrapper";

// api
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <UserInitWrapper>
          <RouterProvider router={router} />
        </UserInitWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
