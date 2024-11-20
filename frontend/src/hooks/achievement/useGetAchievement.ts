import { useEffect, useState } from "react";
import { getUserAchievements } from "../../services/userAchievementApi";

// Adjust the interface to reflect the data
interface Achievement {
  _id: string;
  achievementId: {
    name: string;
    description: string;
    goal: number;
    type: string;
  };
  progress: number;
  isCompleted: boolean;
}

const useGetUserAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAchievements = async () => {
      try {
        const data = await getUserAchievements();
        setAchievements(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error fetching user achievements");
        setLoading(false);
      }
    };

    fetchUserAchievements();
  }, []);

  return { achievements, loading, error };
};

export default useGetUserAchievements;
