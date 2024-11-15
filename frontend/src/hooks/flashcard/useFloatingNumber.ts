import { useState } from "react";

type FloatingNumber = { id: number; value: number; top: number };

export const useFloatingNumbers = () => {
  const [experienceNumbers, setFloatingNumbers] = useState<FloatingNumber[]>(
    []
  );

  const addFloatingNumber = (value: number) => {
    const newFloatingNumber = {
      id: Date.now(),
      value: value,
      top: experienceNumbers.length * 25 + 300,
    };

    setFloatingNumbers((prevNumbers) => [...prevNumbers, newFloatingNumber]);

    setTimeout(() => {
      setFloatingNumbers((prevNumbers) =>
        prevNumbers.filter((num) => num.id !== newFloatingNumber.id)
      );
    }, 2000);
  };

  return { experienceNumbers, addFloatingNumber };
};
