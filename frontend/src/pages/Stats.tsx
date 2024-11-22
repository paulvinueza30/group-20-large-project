import SideGrid from "../components/sidebar/SideGrid";
import { useUserProfile } from "../context/UserProfileContext";
import useGetUserAchievements from "../hooks/achievement/useGetAchievement";

function Stats() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  const { achievements, loading, error } = useGetUserAchievements();

  if (loading) {
    return <div>Loading...</div>;
  }

  const Pcolor = userProfile.colorPreferences.primary;

  const categorizeAchievements = {
    Player: achievements?.filter((ach) => ach.achievementId.type === "Player"),
    Deck: achievements?.filter((ach) => ach.achievementId.type === "Deck"),
    Streak: achievements?.filter((ach) => ach.achievementId.type === "Streak"),
  };
  
  {/*comment*/}
  return (
   <div className="flex">
        <SideGrid color={Pcolor} />
      <div className="flex w-full ml-20">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-4 w-full">
            <div className=" h-full w-full col-span-6">
              <h1 className="font-bold text-2xl dark:text-white pt-14">
                Achievements
              </h1>
            </div>

            {/*Player Column*/}
            <div className = "col-span-1 col-start-1 row-span-6">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "font-bold text-2xl">Player</h1>
                  {categorizeAchievements.Player?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "text-xl">
                        {ach.achievementId.name}
                      </h3>
                      <p className = "text-sm">
                        {ach.achievementId.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl dark:text-white">
                    No achievements found
                  </p>
                )}
                {error && (
                  <div className="text-xl dark:text-white">Error: {error}</div>
              )}
            </div>

            {/*Deck column*/}
            <div className = "col-span-1 col-start-2 row-span-6">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "font-bold text-2xl">Deck</h1>
                  {categorizeAchievements.Deck?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "text-xl">
                        {ach.achievementId.name}
                      </h3>
                      <p className = "text-sm">
                        {ach.achievementId.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                  <p className="text-2xl dark:text-white">
                    No achievements found
                  </p>
                )}
                {error && (
                  <div className="text-xl dark:text-white">Error: {error}</div>
                )}
            </div>

            {/*Streak column*/}
            <div className = "col-span-1 col-start-3 row-span-6">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "font-bold text-2xl">Streaks</h1>
                  {categorizeAchievements.Streak?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "text-xl">
                        {ach.achievementId.name}
                      </h3>
                      <p className = "text-sm">
                        {ach.achievementId.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl dark:text-white">
                  No achievements found
                </p>
              )}
              {error && (
                <div className="text-xl dark:text-white">Error: {error}</div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Stats;
