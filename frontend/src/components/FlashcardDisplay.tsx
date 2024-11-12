import React from "react";
import { IFlashcard } from "../interfaces/IFlashcard";
import { useUserProfile } from "../context/UserProfileContext"; // Import user profile context

interface FlashcardDisplayProps {
  flashcard: IFlashcard;
  onEdit: () => void;
  onDelete: () => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  onEdit,
  onDelete,
}) => {
  const { userProfile } = useUserProfile(); // Access user profile
  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86";
  const Scolor = userProfile ? userProfile.colorPreferences.secondary : "#BA72E2";

  return (
    <div className="p-4 bg-slate-100 dark:bg-dark-primary rounded-xl mb-4">
      <h3 className="text-xl font-bold dark:text-white">Front</h3>
      <p className="text-lg dark:text-white">{flashcard.frontSide}</p>
      <h3 className="text-xl font-bold dark:text-white mt-4">Back</h3>
      <p className="text-lg dark:text-white">{flashcard.backSide}</p>

      <div className="flex mt-4">
        <button
          onClick={onEdit}
          style={{ backgroundColor: Pcolor }}
          className="text-white font-semibold px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{ backgroundColor: Scolor }}
          className="text-white font-semibold px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
