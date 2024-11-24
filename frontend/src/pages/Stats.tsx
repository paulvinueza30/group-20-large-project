import SideGrid from "../components/sidebar/SideGrid";
import { useState, useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import useGetUserAchievements from "../hooks/achievement/useGetAchievement";
import badge1 from "../assets/badge1.png";
import badge2 from "../assets/badge2.png";
import badge3 from "../assets/badge3.png";
import badge4 from "../assets/badge4.png";
import badge5 from "../assets/badge5.png";
import badge6 from "../assets/badge6.png";
import badge7 from "../assets/badge7.png";

function Stats() {
  const levelicon = badge1;
  const { achievements, loading, error } = useGetUserAchievements();

  const [frame, setFrame] = useState<string>(() => {
    return localStorage.getItem("selectedFrame") || ""; // Get frame from localStorage or default to an empty string
  });

  useEffect(() => {
    if (frame) {
      localStorage.setItem("selectedFrame", frame); // Persist frame selection to localStorage
    }
  }, [frame]);
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const Pcolor = userProfile.colorPreferences.primary;

  const categorizeAchievements = {
    Player: achievements?.filter((ach) => ach.achievementId.type === "Player"),
    Deck: achievements?.filter((ach) => ach.achievementId.type === "Deck"),
    Streak: achievements?.filter((ach) => ach.achievementId.type === "Streak"),
  };

  const badgeImages = [badge1, badge2, badge3, badge4, badge5, badge6, badge7];

  const badgeStyles = [
    "w-[6.2rem] h-[5.4rem] relative -left-1 ", // style for badge1
    "w-[5.5rem] h-[5.7rem] relative -left-1", // style for badge2
    "w-[5.7rem] h-[5.4rem] relative -left-1 ", // style for badge3
    "w-[6rem] h-[6rem] relative -left-1 ", // style for badge4
    "w-[5.7rem] h-[5.7rem] relative -left-1 ", // style for badge5
    "w-[6rem] h-[6.3rem] relative ", // style for badge6
    "w-[6.7rem] h-[6.3rem] relative -left-4 ", // style for badge7
  ];

  return (
    <div className="flex">
      <SideGrid color={Pcolor} />
      <div className="flex w-full ml-20 ">
        <div className="grid grid-cols-6 auto-rows-[100px] gap-4 w-full">
          <div className=" h-full w-full col-span-6">
            <h1 className="font-bold text-2xl dark:text-white pt-14">
              Achievements
            </h1>
          </div>

          {/*Player Column*/}
          <div className="flex flex-col col-span-2 col-start-1 row-span-6 ">
            {achievements && achievements.length > 0 ? (
              <ul className="border-2 m-2 rounded-xl p-3">
                <h1 className="flex flex-col items-center font-bold text-3xl dark:text-white">
                  Player
                </h1>
                {categorizeAchievements.Player?.map((ach, index) => (
                  <li key={ach._id} className="flex py-2 relative">
                    {/* Manually changing the "Reach Level 1" */}
                    {index === 0 && (
                      <>
                        <img
                          className={`${
                            badgeStyles[index % badgeStyles.length]
                          }`}
                          src={badgeImages[index % badgeImages.length]}
                          alt={`badge-${index}`}
                        />
                        <div className="flex flex-col w-80 h-20 absolute left-24 p-2">
                          <h3 className="text-xl dark:text-white relative top-2">
                            {ach.achievementId.name}
                          </h3>
                          <div className="w-4/5 bg-gray-200 rounded-full h-4 dark:bg-gray-700 relative top-3">
                            <div
                              className="bg-purple-600 h-4 rounded-full dark:bg-purple-500 mb-2"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )}

                    {index != 0 && (
                      <>
                        <img
                          className={`${
                            badgeStyles[index % badgeStyles.length]
                          } ${ach.isCompleted ? "opacity-100" : "opacity-50"}`}
                          src={badgeImages[index % badgeImages.length]}
                          alt={`badge-${index}`}
                        />
                        <div className="flex flex-col w-80 h-20 absolute left-24 p-2">
                          <h3 className="text-xl dark:text-white relative top-2">
                            {ach.achievementId.name}
                          </h3>
                          {/* Progress */}
                          <div className="w-4/5 bg-gray-200 rounded-full h-4 dark:bg-gray-700 relative top-3">
                            <div
                              className="bg-purple-600 h-4 rounded-full dark:bg-purple-500 mb-2"
                              style={{
                                width: `${ach.isCompleted ? "100%" : "0%"}`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-2xl dark:text-white">No achievements found</p>
            )}
            {error && (
              <div className="text-xl dark:text-white">Error: {error}</div>
            )}
          </div>

          {/*Deck column*/}
          <div className="flex flex-col col-span-2 col-start-3 row-span-6">
            {achievements && achievements.length > 0 ? (
              <ul className="border-2 m-2 rounded-xl p-3">
                <h1 className="flex flex-col items-center font-bold text-3xl dark:text-white">
                  Decks
                </h1>
                {categorizeAchievements.Deck?.map((ach, index) => (
                  <li key={ach._id} className="flex py-2 relative">
                    <img
                      className={`${badgeStyles[index % badgeStyles.length]} ${
                        ach.isCompleted ? "opacity-100" : "opacity-50"
                      }`}
                      src={badgeImages[index % badgeImages.length]}
                      alt={`badge-${index}`}
                    />
                    <div className="flex flex-col w-80 h-20 absolute left-24 p-2">
                      <h3 className="text-xl dark:text-white relative top-2">
                        {ach.achievementId.name}
                      </h3>
                      <div className="w-4/5 bg-gray-200 rounded-full h-4 dark:bg-gray-700 relative top-3">
                        <div
                          className="bg-purple-600 h-4 rounded-full dark:bg-purple-500 mb-2"
                          style={{
                            width: `${ach.isCompleted ? "100%" : "0%"}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-2xl dark:text-white">No achievements found</p>
            )}
            {error && (
              <div className="text-xl dark:text-white">Error: {error}</div>
            )}
          </div>

          {/*Streak column*/}
          <div className="flex flex-col col-span-2 col-start-5 row-span-6">
            {achievements && achievements.length > 0 ? (
              <ul className="border-2 m-2 rounded-xl p-3">
                <h1 className="flex flex-col items-center font-bold text-3xl dark:text-white">
                  Streak
                </h1>
                {categorizeAchievements.Streak?.map((ach, index) => (
                  <li key={ach._id} className="flex py-2 relative">
                    <img
                      className={`${badgeStyles[index % badgeStyles.length]} ${
                        ach.isCompleted ? "opacity-100" : "opacity-50"
                      }`}
                      src={badgeImages[index % badgeImages.length]}
                      alt={`badge-${index}`}
                    />
                    <div className="flex flex-col w-80 h-20 absolute left-24 p-2">
                      <h3 className="text-xl dark:text-white relative top-2">
                        {ach.achievementId.name}
                      </h3>
                      <div className="w-4/5 bg-gray-200 rounded-full h-4 dark:bg-gray-700 relative top-3">
                        <div
                          className="bg-purple-600 h-4 rounded-full dark:bg-purple-500 mb-2"
                          style={{
                            width: `${ach.isCompleted ? "100%" : "0%"}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-2xl dark:text-white">No achievements found</p>
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
