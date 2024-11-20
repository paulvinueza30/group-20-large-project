import level1 from "../assets/level1.png";
import level2 from "../assets/level2.png";
import level5 from "../assets/level5.png";
import level10 from "../assets/level10.png";
import level20 from "../assets/level20.png";
import { useUserProfile } from "../context/UserProfileContext";

interface Props {
  frame: string;
  setFrame: (frame: string) => void;
}

function FrameSelection({ frame: _, setFrame }: Props) {
  const { userProfile } = useUserProfile();
  let playerLevel = 1;
  if (userProfile?.userLevel) {
    playerLevel = userProfile?.userLevel; // Define the player's current level
  }

  const frames = [
    {
      name: level1,
      lvl: 1,
      style: "w-[10.5rem] h-[10.5rem] z-50 cursor-pointer relative -top-3",
    },
    {
      name: level2,
      lvl: 2,
      style: "w-[10rem] h-[10.5rem] z-50 cursor-pointer",
    },
    { name: level5, lvl: 5, style: "w-50 h-40 z-50 cursor-pointer" },
    { name: level10, lvl: 10, style: "w-50 h-40 z-50 cursor-pointer" },
    { name: level20, lvl: 20, style: "w-50 h-40 z-50 cursor-pointer" },
  ];

  const handleFrameSelection = (name: string) => {
    setFrame(name); // Update the selected frame in the parent state
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl py-4 dark:text-white">
        Frame Selection
      </h2>
      <div className="flex flex-wrap justify-center items-center relative">
        {frames.map(({ name, lvl, style }) => {
          const isUnavailable = playerLevel < lvl;

          return (
            <div key={lvl} className="relative m-2">
              <img
                src={name}
                alt={`Level ${lvl} frame`}
                className={`${style} ${isUnavailable ? "opacity-50" : ""}`}
                onClick={() => !isUnavailable && handleFrameSelection(name)} // Disable click if frame is unavailable
              />
              {isUnavailable && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <span className="text-4xl text-red-500 font-bold">X</span>
                  <h3>Requires level {lvl}</h3>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FrameSelection;
