import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import { logoutUser } from "../services/userApi";

const INACTIVITY_WARNING_TIME = 5 * 60 * 1000; // 5 minutes (in milliseconds)
const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes (in milliseconds)

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

  useEffect(() => {
    // Log out function
    const logout = async () => {
      await logoutUser(); // Log out the user from the API
      localStorage.clear();
      document.cookie = "connect.sid=; Max-Age=0; path=/";
      navigate("/login");
    };

    const checkUserProfile = async () => {
      if (userProfile === null) {
        setIsLoading(false);
        setShowMessage(true);
        // Logout and redirect if the user is not logged in
        setTimeout(async () => {
          navigate("/login");
        }, 2000);
      } else {
        setIsLoading(false);
        setShowMessage(false);
      }
    };

    // Set initial state on first load
    const storedLastActivity = localStorage.getItem("lastActivity");
    if (storedLastActivity) {
      setLastActivityTime(parseInt(storedLastActivity));
    }

    checkUserProfile(); // Run the check for user profile

    // Handle user activity (reset last activity time)
    const handleUserActivity = () => {
      const now = Date.now();
      setLastActivityTime(now);
      localStorage.setItem("lastActivity", now.toString());
      setShowWarning(false); // Hide the warning
    };

    // Listen for user activity
    document.addEventListener("click", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Inactivity warning timer
    const inactivityTimer = setTimeout(() => {
      if (Date.now() - lastActivityTime >= INACTIVITY_WARNING_TIME) {
        setShowWarning(true); // Show warning after inactivity period
      }
    }, INACTIVITY_WARNING_TIME);

    // Timeout timer to log out after a certain period of inactivity
    const timeoutTimer = setTimeout(() => {
      if (Date.now() - lastActivityTime >= TIMEOUT_DURATION) {
        setShowMessage(true);
        setTimeout(async () => {
          await logout(); // Log out the user after session timeout
        }, 2000);
      }
    }, TIMEOUT_DURATION);

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(timeoutTimer);
      document.removeEventListener("click", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
    };
  }, [userProfile, navigate, lastActivityTime]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while checking the user state
  }

  if (showMessage) {
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

  if (showWarning) {
    return (
      <div className="text-center mt-8 bg-yellow-100 p-4 border border-yellow-400 rounded-md">
        <h2 className="text-xl font-semibold text-yellow-700">
          Are you still there?
        </h2>
        <p className="text-yellow-600">
          Click or press any key to continue your session.
        </p>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
