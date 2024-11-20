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
    <div
      className="h-full relative bg-slate-100 dark:bg-dark-primary shadow-md rounded-[30px]"
      style={{
        position: "relative",
      }}
    >
      <div className="rain-container absolute top-0 left-0 right-0 bottom-0 z-0"></div>
      <div className="flex flex-col items-center h-5/6 ">
        <div
          className="md:w-64 md:h-64 sm:w-32 sm:h-32 object-cover self-center border-2 rounded-full p-1 relative -top-40 shadow-xl"
          style={{
            backgroundColor: Scolor,
            borderColor: Scolor,
          }}
        >
          <div className="text-white">
            <label
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              htmlFor="files"
              className="z-50 -bottom-[3px] left-0 opacity-0 hover:opacity-100 border-none text-center absolute pt-12 hover:bg-opacity-70 rounded-full md:w-64 md:h-64 sm:w-32 sm:h-32 text-4xl text-gray-800"
              style={{
                backgroundColor: isHover ? Scolor : "transparent",
                opacity: isHover ? 0.8 : 0,
              }}
            >
              <PhotoIcon className="w-20 h-20 place-self-center " />
              Select Image
            </label>
            <input
              id="files"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            {frames.map(({ name, style }) =>
              frame === name ? (
                <img key={name} src={name} className={style} />
              ) : null
            )}
          </div>
          <img
            src={profilePicUrl}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full z-10" // Ensures the image fills the wrapper
          />
        </div>
        <div className="flex flex-col justify-start w-full relative -top-32 min-h-full overflow-hidden">
          <p className={textStyle}>
            <span className="font-bold">Name:</span> {userProfile.name}
          </p>
          <p className={`${textStyle} pb-8`}>
            {" "}
            <span className="font-bold">Current Level: </span>
            {userProfile.userLevel}
          </p>
          <div className="w-5/6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 self-center relative bottom-8 z-20">
            <div
              className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500 mb-2"
              style={{ width: w }}
            ></div>
          </div>
          <p className={`${textStyle} mt-4`}>
            <span className="font-bold">Email:</span> {userProfile.email}
          </p>
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
