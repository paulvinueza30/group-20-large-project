import React, { useState } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import placeholder from "../assets/Transhumans - Astro.png";
import { PhotoIcon } from "@heroicons/react/24/outline";
import background from "../assets/profileBg2.png";
import level1 from "../assets/level1.png";
import level2 from "../assets/level2.png";
import level5 from "../assets/level5.png";
import level10 from "../assets/level10.png";
import level20 from "../assets/level20.png";
import badge1 from "../assets/badge1.png";
import badge3 from "../assets/badge3.png";
import badge5 from "../assets/badge5.png";

interface UserInfoProps {
  Pcolor: string;
  Scolor: string;
  frame: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ Pcolor, Scolor, frame }) => {
  const [isHover, setIsHover] = useState(false);
  const { userProfile, updateProfilePic } = useUserProfile();
  const textStyle =
    "rounded-xl mb-2 bg-white p-5 m-4 dark:bg-dark-secondary dark:text-white text-xl z-10";

  // Handle the file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the file object
    if (file) {
      updateProfilePic(file);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  if (!userProfile) {
    return <div>Loading user information...</div>;
  }

  // Construct the image URL if the profilePic is a relative path
  const profilePicUrl = userProfile.profilePic
    ? `${process.env.REACT_APP_SERVER_URL}${userProfile.profilePic}` // Ensure the correct base URL
    : placeholder;

  const frames = [
    {
      name: level1,
      style:
        "md:min-w-[22rem] sm:min-w-20 -top-[4.6rem] -left-[3.5rem] absolute",
    },
    {
      name: level2,
      style:
        "md:min-w-[20rem]  sm:min-w-20 -top-[2.7rem] -left-[2.3rem] absolute",
    },
    {
      name: level5,
      style:
        "md:min-w-[23.5rem] sm:min-w-20 -top-[3rem] -left-[4.1rem] absolute",
    },
    {
      name: level10,
      style:
        "md:min-w-[23.2rem] sm:min-w-20 -top-[3.5rem] -left-[3.7rem] absolute",
    },
    {
      name: level20,
      style:
        "md:min-w-[24.5rem] sm:min-w-20 -top-[3.5rem] -left-[4.6rem] absolute",
    },
  ];

  const xpRequired = (userProfile.userLevel - 1) * 100;
  const xpRemaining = xpRequired - userProfile.userExperience;
  const xpBar = xpRemaining * -1; // ensure it's not negative
  const w = xpBar + "%"; // setting the width for the xp bar

  return (
    <div className="h-full relative bg-slate-100 dark:bg-dark-primary shadow-md rounded-[30px]">
      <div className="flex flex-col items-center h-5/6 ">
        <div
          className="w-64 h-64 object-cover self-center border-2 rounded-full p-1 relative -top-40 shadow-xl"
          style={{
            backgroundColor: Scolor,
            borderColor: Scolor,
          }}
        >
          <div className="text-white">
            {/* this is the change image circle */}
            <label
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              htmlFor="files"
              className="z-50 -bottom-[3px] left-0 opacity-0 hover:opacity-100 border-none text-center absolute pt-12 hover:bg-opacity-70 rounded-full w-64 h-64 text-4xl text-gray-800"
              style={{
                backgroundColor: isHover ? Scolor : "transparent",
                opacity: isHover ? 0.8 : 0,
              }}
            >
              <PhotoIcon className="w-20 h-20 place-self-center" />
              Select Image
            </label>
            <input
              id="files"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* end of change image circle */}

            {/* frames */}
            {frames.map(({ name, style }) =>
              frame === name ? (
                <img key={name} src={name} className={style} />
              ) : null
            )}
          </div>

          {/* user image */}
          <img
            src={profilePicUrl}
            alt="User Profile"
            className="w-64 h-64 object-cover rounded-full z-10" // Ensures the image fills the wrapper
          />
        </div>
        <div className="flex flex-col justify-start w-full relative -top-32 min-h-full overflow-hidden">
          <p className="font-bold self-center text-4xl font-pixel tracking-wider pt-5 dark:text-white">
            {userProfile.name}
          </p>
          <p className="self-center pt-10 font-bold tracking-wide dark:text-white ">
            LEVEL {userProfile.userLevel}
          </p>
          <div className="w-5/6 bg-gray-200 rounded-full h-4 dark:bg-gray-700 self-center relative bottom-12 z-20">
            <div
              className="bg-purple-600 h-4 rounded-full dark:bg-purple-500 mb-2"
              style={{ width: w, backgroundColor: Pcolor }}
            ></div>
          </div>
          <div className="rounded-xl bg-white w-[90%] self-center h-40 dark:bg-dark-secondary flex content-center items-center justify-between">
            <div className="flex flex-col">
              <h3 className="self-center text-xl font-semibold font-pixel tracking-wider dark:text-white">
                Player
              </h3>
              <img src={badge1} alt="" className="w-24 h-20" />
            </div>
            <div className="flex flex-col">
              <h3 className="self-center text-xl font-semibold font-pixel tracking-wider dark:text-white">
                Deck
              </h3>
              <img src={badge3} alt="" className="w-24 h-20" />
            </div>
            <div className="flex flex-col">
              <h3 className="self-center text-xl font-semibold font-pixel tracking-wider dark:text-white">
                Streaks
              </h3>
              <img src={badge5} alt="" className="w-24 h-20" />
            </div>
          </div>
          <img
            src={background}
            alt=""
            className="absolute -bottom-2 opacity-80 w-[20rem] -right-5 z-20"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
