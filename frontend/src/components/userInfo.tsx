import React, { useState } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import placeholder from "../assets/Transhumans - Astro.png";
import { PhotoIcon } from "@heroicons/react/24/outline";
import background from "../assets/profileBg.png";
import waves from "../assets/waves.png";
import blossoms from "../assets/blossoms.png";
import cat from "../assets/catFrame.png";
import frog from "../assets/frogFrame.png";

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

  return (
    <div className="h-full relative bg-slate-100 dark:bg-dark-primary shadow-md rounded-[30px]">
      <div className="flex flex-col items-center h-5/6">
        <div
          className="w-72 h-72 object-cover self-center border-2 rounded-full p-1 relative -top-40 shadow-xl"
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
              className="z-50 -bottom-[3px] left-0 opacity-0 hover:opacity-100 border-none text-center absolute pt-12 hover:bg-opacity-70 rounded-full w-72 h-72 text-4xl text-gray-800"
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
            {frame === blossoms && (
              <img
                src={blossoms}
                alt=""
                className="min-w-[20rem] -top-[1rem] -left-[1.2rem] absolute"
              />
            )}
            {frame === waves && (
              <img
                src={waves}
                alt=""
                className="min-w-[21rem] top-2 -left-5 absolute"
              />
            )}
            {frame === cat && (
              <img
                src={cat}
                alt=""
                className="min-w-[32rem] -top-[7.5rem] -right-[7rem] absolute"
              />
            )}
            {frame === frog && (
              <img
                src={frog}
                alt=""
                className="min-w-[27rem] -top-[1rem] -right-[4.5rem] absolute"
              />
            )}
          </div>
          <img
            src={profilePicUrl}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full" // Ensures the image fills the wrapper
          />
        </div>
        <div className="flex flex-col justify-start w-full relative -top-32">
          <p className={textStyle}>
            <span className="font-bold">Name:</span> {userProfile.name}
          </p>
          <p className={textStyle}>
            {" "}
            <span className="font-bold">Current Level:</span>{" "}
          </p>
          <p className={textStyle}>
            <span className="font-bold">Daily Streak:</span>{" "}
          </p>
          <p className={textStyle}>
            <span className="font-bold">Email:</span> {userProfile.email}
          </p>
        </div>
      </div>
      <img src={background} alt="" className="absolute bottom-0 opacity-70" />
    </div>
  );
};

export default UserInfo;
