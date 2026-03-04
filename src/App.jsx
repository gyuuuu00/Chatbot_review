import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Register from "./pages/Register/Register.jsx";
import ScenarioAPage from "./pages/ScenarioAPage/ScenarioAPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import { getCurrentConfig } from "./config/chatbotConfig";

function App() {
  const chatbotConfig = getCurrentConfig();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scenario" element={<ScenarioAPage />} />
        <Route path="/chat" element={<ChatPage config={chatbotConfig} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;