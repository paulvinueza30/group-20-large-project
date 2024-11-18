import axios from "axios";

const USER_ACHIEVEMENT_API_URL =
  `${process.env.REACT_APP_API_URL}/achievements` ||
  "http://localhost:5000/api/achievements";

// Fetch all achievements for the logged-in user
export const getUserAchievements = async () => {
  try {
    const response = await axios.get(
      `${USER_ACHIEVEMENT_API_URL}/userAchievements`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Increment progress for a user's specific achievement
export const incrementUserAchievement = async (
  userId: string,
  type: "Player" | "Deck" | "Streak",
  incrementBy: number,
  options: { categoryId?: string } = {}
) => {
  try {
    const payload = { type, incrementBy, options };
    const response = await axios.post(
      `${USER_ACHIEVEMENT_API_URL}/increment/${userId}`,
      payload,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};

// Update a specific achievement's progress manually
export const updateUserAchievement = async (
  achievementId: string,
  progress: number
) => {
  try {
    const response = await axios.put(
      `${USER_ACHIEVEMENT_API_URL}/${achievementId}`,
      { progress },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response
      ? error.response.data
      : new Error("Internal server error");
  }
};
