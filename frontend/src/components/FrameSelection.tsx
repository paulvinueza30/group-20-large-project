import React from "react";
import waves from "../assets/waves.png";
import blossoms from "../assets/blossoms.png";
import cat from "../assets/catFrame.png";
import frog from "../assets/frogFrame.png";

interface Props {
  frame: string;
  setFrame: (frame: string) => void;
}

function FrameSelection({ frame, setFrame }: Props) {
  const handleFrameSelection = (name: string) => {
    console.log(name);
    setFrame(name);
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl py-4 dark:text-white">
        Select A Frame
      </h2>
      <div className="flex flex-wrap">
        <img
          src={waves}
          className="w-40 h-40"
          onClick={() => handleFrameSelection(waves)}
        />
        <img
          src={blossoms}
          className="w-40 h-40"
          onClick={() => handleFrameSelection(blossoms)}
        />
        <img
          src={cat}
          className="w-50 h-40"
          onClick={() => handleFrameSelection(cat)}
        />
        <img
          src={frog}
          className="w-50 h-40"
          onClick={() => handleFrameSelection(frog)}
        />
      </div>
    </div>
  );
}

export default FrameSelection;
