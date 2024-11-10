import React, { useState } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import placeholder from "../assets/Transhumans - Astro.png";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface UserInfoProps {
  Pcolor: string;
  Scolor: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ Pcolor, Scolor }) => {
  const [isHover, setIsHover] = useState(false);
  const { userProfile, updateProfilePic } = useUserProfile();
  const textStyle =
    "rounded-xl mb-2 bg-white p-2 m-4 dark:bg-dark-secondary dark:text-white";

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
    <div>
      <h2 className="text-center font-bold text-xl py-4 dark:text-white">
        User Info
      </h2>
      <div className="flex flex-col items-center">
        <div
          className="w-[140px] h-[140px] object-cover self-center border-2 rounded-full p-1 relative"
          style={{
            backgroundColor: Scolor,
            borderColor: Scolor,
          }}
        >
          <div className="text-white ">
            <label
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              htmlFor="files"
              className="-bottom-[3px] left-0 opacity-0 hover:opacity-100 border-none text-center absolute pt-12 hover:bg-opacity-70 rounded-full w-[140px] h-[140px]"
              style={{
                backgroundColor: isHover ? Scolor : "transparent",
                opacity: isHover ? 0.8 : 0,
              }}
            >
              <PhotoIcon className="w-10 h-10 place-self-center " />
              Select Image
            </label>
            <input
              id="files"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <img
            src={profilePicUrl}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full" // Ensures the image fills the wrapper
          />
        </div>
        <div className="flex flex-col justify-start">
          <p className={textStyle}>Name: {userProfile.name}</p>
          <p className={textStyle}>Current Level: </p>
          <p className={textStyle}>Daily Streak: </p>
          <p className={textStyle}>Email: {userProfile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
