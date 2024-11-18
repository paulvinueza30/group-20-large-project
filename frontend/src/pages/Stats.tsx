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

  return (
    <>
      <div className="flex">
        <SideGrid color={Pcolor} />
        <div className="flex w-full ml-20">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-4 w-full">
            <div className=" h-full w-full col-span-6">
              <h1 className="font-bold text-2xl dark:text-white pt-14">
                Achievements
              </h1>
            </div>
            <div className="col-span-6 col-start-1 row-span-4 row-start-2">
              {achievements && achievements.length > 0 ? (
                <ul>
                  {achievements.map((achievement) => (
                    <div
                      key={achievement._id}
                      className="border-2 m-2 rounded-xl p-3"
                    >
                      {" "}
                      {/* Add key prop here */}
                      <h1 className="text-2xl font-bold">
                        {achievement.achievementId.type}
                      </h1>{" "}
                      <h3 className="text-xl">
                        {achievement.achievementId.name}
                      </h3>{" "}
                      {/* Use the achievement's _id */}
                      <p className="text-sm">
                        {achievement.achievementId.description}
                      </p>{" "}
                      {/* Access description from achievementId */}
                    </div>
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
    </>
  );
}

export default Stats;
