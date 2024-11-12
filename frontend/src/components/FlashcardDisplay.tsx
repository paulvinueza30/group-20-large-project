import React, { useState } from "react";
import { IFlashcard } from "../interfaces/IFlashcard";
import { editFlashcard } from "../services/flashCardApi";
import { useUserProfile } from "../context/UserProfileContext";

interface FlashcardDisplayProps {
  flashcard: IFlashcard;
  onDelete: () => void;
  onUpdate: (updatedFlashcard: IFlashcard) => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  onDelete,
  onUpdate,
}) => {
  const { userProfile } = useUserProfile();
  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86";
  const Scolor = userProfile ? userProfile.colorPreferences.secondary : "#BA72E2";

  const [isEditing, setIsEditing] = useState(false);
  const [frontSide, setFrontSide] = useState(flashcard.frontSide);
  const [backSide, setBackSide] = useState(flashcard.backSide);

  const handleSave = async () => {
    try {
      const updatedFlashcard = await editFlashcard({
        id: flashcard._id,
        frontSide,
        backSide,
      });
      onUpdate(updatedFlashcard); // Trigger the onUpdate prop
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };
  

  return (
    <div className="p-4 bg-slate-100 dark:bg-dark-primary rounded-xl mb-4">
      {isEditing ? (
        <>
          <h3 className="text-xl font-bold dark:text-white">Front</h3>
          <input
            type="text"
            value={frontSide}
            onChange={(e) => setFrontSide(e.target.value)}
            className="text-lg dark:text-white p-2 bg-gray-200 rounded"
          />
          <h3 className="text-xl font-bold dark:text-white mt-4">Back</h3>
          <input
            type="text"
            value={backSide}
            onChange={(e) => setBackSide(e.target.value)}
            className="text-lg dark:text-white p-2 bg-gray-200 rounded"
          />
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold dark:text-white">Front</h3>
          <p className="text-lg dark:text-white">{flashcard.frontSide}</p>
          <h3 className="text-xl font-bold dark:text-white mt-4">Back</h3>
          <p className="text-lg dark:text-white">{flashcard.backSide}</p>
        </>
      )}

      <div className="flex mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{ backgroundColor: Pcolor }}
              className="text-white font-semibold px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{ backgroundColor: Scolor }}
              className="text-white font-semibold px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardDisplay;
