import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Decks from "./pages/Decks.tsx";
import Profile from "./pages/Profile.tsx";
import Stats from "./pages/Stats.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { UserProfileProvider } from "./context/UserProfileContext"; // Import the provider

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Routes that don't need the context */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/decks" element={<Decks />} />
      <Route path="/stats" element={<Stats />} />

      {/* Wrap the Dashboard and Profile routes with the UserProfileProvider */}
      <Route
        path="/dashboard"
        element={
          <UserProfileProvider>
            <Dashboard />
          </UserProfileProvider>
        }
      />
      <Route
        path="/profile"
        element={
          <UserProfileProvider>
            <Profile />
          </UserProfileProvider>
        }
      />
    </Routes>
  </BrowserRouter>
);
