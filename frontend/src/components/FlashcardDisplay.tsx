import React from "react";
import { IFlashcard } from "../interfaces/IFlashcard";

interface FlashcardDisplayProps {
  flashcard: IFlashcard;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ flashcard }) => {
  return (
    <div className="p-4 bg-slate-100 dark:bg-dark-primary rounded-xl mb-4">
      <h3 className="text-xl font-bold dark:text-white">Front</h3>
      <p className="text-lg dark:text-white">{flashcard.frontSide}</p>
      <h3 className="text-xl font-bold dark:text-white mt-4">Back</h3>
      <p className="text-lg dark:text-white">{flashcard.backSide}</p>
    </div>
  );
};

export default FlashcardDisplay;
