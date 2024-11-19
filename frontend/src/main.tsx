import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Decks from "./pages/Decks.tsx";
import DeckDetails from "./pages/DeckDetails.tsx";
import Profile from "./pages/Profile.tsx";
import Stats from "./pages/Stats.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { UserProfileProvider } from "./context/UserProfileContext";
import Review from "./pages/Review.tsx";
import AuthGuard from "./components/AuthGuard"; // Import the new AuthGuard component

const AppWithRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes wrapped with AuthGuard */}
        <Route
          path="/dashboard"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
        <Route
          path="/decks"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <Decks />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
        <Route
          path="/decks/:categoryId"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <DeckDetails />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
        <Route
          path="/review/:categoryId"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <Review />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
        <Route
          path="/achievements"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <Stats />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProfileProvider>
              <AuthGuard>
                <Profile />
              </AuthGuard>
            </UserProfileProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<AppWithRouting />);
