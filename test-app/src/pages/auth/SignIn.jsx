import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "@/services/AuthService";
import LoginPage from "./LoginPage";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // const authenticate = await AuthService.login(username, password);
      // authenticate ? navigate("/home") : navigate("/login");
      await AuthService.login(username, password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginPage
      handleLogin={handleLogin}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );
};

export default SignIn;
