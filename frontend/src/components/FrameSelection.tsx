import level1 from "../assets/level1.png";
import level2 from "../assets/level2.png";
import level5 from "../assets/level5.png";
import level10 from "../assets/level10.png";
import level20 from "../assets/level20.png";

interface Props {
  frame: string;
  setFrame: (frame: string) => void;
}

function FrameSelection({ frame, setFrame }: Props) {
  const playerLevel = 11; // Define the player's current level

  const frames = [
    { name: level1, lvl: 1 },
    { name: level2, lvl: 2 },
    { name: level5, lvl: 5 },
    { name: level10, lvl: 10 },
    { name: level20, lvl: 20 },
  ];

  const handleFrameSelection = (name: string) => {
    setFrame(name);
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl py-4 dark:text-white">
        Frame Selection
      </h2>
      <div className="flex flex-wrap justify-center relative">
        {frames.map(({ name, lvl }) => {
          const isUnavailable = playerLevel < lvl;

          return (
            <div key={lvl} className="relative m-2">
              <img
                src={name}
                alt={`Level ${lvl} frame`}
                className={`w-50 h-40 z-50 cursor-pointer ${
                  isUnavailable ? "opacity-50" : ""
                }`}
                onClick={() => !isUnavailable && handleFrameSelection(name)} // Disable click if frame is unavailable
              />
              {isUnavailable && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <span className="text-4xl text-red-500 font-bold">X</span>
                  <h3>Required: level {lvl}</h3>
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
