import { HStack } from "@chakra-ui/react";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { useUserStore } from "./store/chatStore.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const initUser = useUserStore((state) => state.initUser);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <HStack>
      <LoginPage />
    </HStack>
  );
}

export default App;
