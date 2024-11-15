import React from "react";

type FloatingXPProps = {
  experienceNumbers: { id: number; value: number; top: number }[];
};

const FloatingXP: React.FC<FloatingXPProps> = ({ experienceNumbers }) => {
  return (
    <>
      {experienceNumbers.map((num) => (
        <div
          key={num.id}
          className="absolute text-green-600 text-3xl font-bold animate-float z-50"
          style={{
            top: `${num.top}px`,
            left: "70%",
            transform: "translateX(-50%)",
          }}
        >
          + {num.value} xp
        </div>
      ))}
    </>
  );
};

export default FloatingXP;
