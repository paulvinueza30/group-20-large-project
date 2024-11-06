import React from "react";
<<<<<<< HEAD
import useGetUserInfo from "../hooks/user/useGetUserInfo";
=======
import useGetUserInfo from "../hooks/useGetUserInfo";
>>>>>>> d2f7cbe (Restore local changes after .git folder replacement)
import placeholder from "../assets/Transhumans - Astro.png";

const UserInfo: React.FC = () => {
  const textStyle = "rounded-xl mb-2 bg-white p-2 m-4";
  const { user, loading, error } = useGetUserInfo();

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center font-bold text-xl py-4">User Info</h2>
      {user ? (
        <div className="flex flex-col">
          <img
            src={placeholder}
            alt=""
            className="w-[140px] self-center border-2 rounded-full p-5 bg-tertiary"
          />
          <p className={textStyle}>Name: {user.name}</p>
          <p className={textStyle}>Current Level: </p>
          <p className={textStyle}>Daily Streak: </p>
          <p className={textStyle}>Email: {user.email}</p>
          {/* Render other user properties as needed */}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default UserInfo;
