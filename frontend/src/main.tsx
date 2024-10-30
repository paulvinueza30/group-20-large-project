import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Decks from "./pages/Decks.tsx";
import Profile from "./pages/Profile.tsx";
import Stats from "./pages/Stats.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/decks" element={<Decks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </BrowserRouter>
);
