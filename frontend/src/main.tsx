import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Decks from "./pages/Decks.tsx";
import DeckDetails from "./pages/DeckDetails.tsx";
import Flashcard from "./components/Flashcard"; // Import Flashcard component for review mode
import Profile from "./pages/Profile.tsx";
import Stats from "./pages/Stats.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { UserProfileProvider } from "./context/UserProfileContext"; // Import the provider

const AppWithRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that don't need the context */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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
          path="/decks"
          element={
            <UserProfileProvider>
              <Decks /> {/* Renders Decks.tsx showing the list of categories */}
            </UserProfileProvider>
          }
        />
        <Route
          path="/decks/:categoryId"
          element={
            <UserProfileProvider>
              <DeckDetails /> {/* Renders DeckDetails.tsx for the selected category */}
            </UserProfileProvider>
          }
        />
        
        {/* Add the review route for the Flashcard component */}
        <Route
          path="/review/:categoryId"
          element={
            <UserProfileProvider>
              <Flashcard /> {/* Renders Flashcard.tsx to review flashcards in the selected category */}
            </UserProfileProvider>
          }
        />

        <Route
          path="/achievements"
          element={
            <UserProfileProvider>
              <Stats />
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
};

createRoot(document.getElementById("root")!).render(<AppWithRouting />);
