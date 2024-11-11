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
import { UserProfileProvider } from "./context/UserProfileContext"; // Import the provider
import Review from "./pages/Review.tsx";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "./context/UserProfileContext"; // Ensure this is correctly imported
import { useState, useEffect } from "react";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!userProfile) {
      setShowMessage(true);
      // Redirect after 3 seconds (adjust delay as needed)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [userProfile, navigate]);

  if (!userProfile && showMessage) {
    return (
      <div className="text-center mt-8 bg-red-100 p-4 border border-red-400 rounded-md">
        <h2 className="text-xl font-semibold text-red-700">
          Please log in to access the app
        </h2>
        <p className="text-red-600">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  // If authenticated, render the protected element
  return element;
};

export default ProtectedRoute;
const AppWithRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that don't need the context */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Wrap the protected routes with the UserProfileProvider and ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<Dashboard />} />
            </UserProfileProvider>
          }
        />
        <Route
          path="/decks"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<Decks />} />
            </UserProfileProvider>
          }
        />
        <Route
          path="/decks/:categoryId"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<DeckDetails />} />
            </UserProfileProvider>
          }
        />
        <Route
          path="/review/:categoryId"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<Review />} />
            </UserProfileProvider>
          }
        />
        <Route
          path="/achievements"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<Stats />} />
            </UserProfileProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProfileProvider>
              <ProtectedRoute element={<Profile />} />
            </UserProfileProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<AppWithRouting />);
