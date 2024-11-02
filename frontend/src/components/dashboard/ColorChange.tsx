import React, { useState } from "react";

interface Props {
  Pcolor: string;
  Scolor: string;
  setPColor: (color: string) => void;
  setSColor: (color: string) => void;
}

function ColorChange({ Pcolor, setPColor, Scolor, setSColor }: Props) {
  const handlePrimaryColorChange = (event: any) => {
    setPColor(event.target.value); // Update the color state in Dashboard
  };
  const handleSecondaryColorChange = (event: any) => {
    setSColor(event.target.value); // Update the color state in Dashboard
  };

  return (
    <div className="w-full p-2">
      <h1 className="text-center text-xl font-bold py-2">
        Customize the Dashboard
      </h1>
      <input
        type="color"
        value={Pcolor}
        onChange={handlePrimaryColorChange}
        className="w-full h-[100px]"
      />
      <p>Selected Primary: {Pcolor}</p>
      <input
        type="color"
        value={Scolor}
        onChange={handleSecondaryColorChange}
        className="w-full h-[100px]"
      />
      <p>Selected Secondary: {Scolor}</p>
    </div>
  );
}

export default ColorChange;
