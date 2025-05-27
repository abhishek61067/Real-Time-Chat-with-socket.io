import { HStack } from "@chakra-ui/react";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { useUserStore } from "./store/chatStore.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  // const initUser = useUserStore((state) => state.initUser);
  // const user = useUserStore((state) => state.user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const hasUser = initUser();
  //   if (!hasUser) {
  //     navigate("/");
  //   }
  // }, [initUser, navigate]);

  // // Optionally, you can also react to user changes:
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <HStack>
      <LoginPage />
    </HStack>
  );
}

export default App;
