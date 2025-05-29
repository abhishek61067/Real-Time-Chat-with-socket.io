import { HStack } from "@chakra-ui/react";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { useUserStore } from "./store/chatStore.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  return (
    <HStack>
      <LoginPage />
    </HStack>
  );
}

export default App;
