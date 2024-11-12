// DeckDetails.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllFlashcards, deleteFlashcard } from "../services/flashCardApi";
import FlashcardDisplay from "../components/FlashcardDisplay";
import { IFlashcard } from "../interfaces/IFlashcard";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";

function DeckDetails() {
  const { categoryId } = useParams<{ categoryId: string }>(); // Fetch categoryId from URL
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const navigate = useNavigate();

  // Fetch all flashcards for the specified category
  useEffect(() => {
    if (categoryId) {
      getAllFlashcards(categoryId)
        .then((response) => setFlashcards(response))
        .catch((error) => console.error("Error fetching flashcards:", error));
    }
  }, [categoryId]);

  // Handle editing a flashcard
  const handleEditFlashcard = (flashcardId: string) => {
    navigate(`/edit-flashcard/${flashcardId}`); // Navigate to edit page with the flashcard ID
  };

  // Handle deletion of a flashcard
  const handleDeleteFlashcard = async (flashcardId: string) => {
    try {
      await deleteFlashcard(flashcardId); // Call the delete API
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((card) => card._id !== flashcardId)
      ); // Update the state to remove the deleted card
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="flex">
      <SideGrid />
      <div className="w-full ml-20 mr-[30px]">
        <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
          <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
            <div className="pt-8 text-sm flex flex-col text-gray-400">
              <HomeIcon className="h-[15px] w-[15px]" /> / Decks / {categoryId}
            </div>
            <h1 className="font-bold text-2xl dark:text-white">
              All cards from {categoryId}
            </h1>
          </div>
          <div className="col-start-2 col-span-4 row-span-3 row-start-2">
            {flashcards.length > 0 ? (
              flashcards.map((card) => (
                <FlashcardDisplay
                  key={card._id}
                  flashcard={card}
                  onEdit={() => handleEditFlashcard(card._id)} // Pass onEdit prop
                  onDelete={() => handleDeleteFlashcard(card._id)} // Pass onDelete prop
                />
              ))
            ) : (
              <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-[250px] flex justify-center flex-col">
                <h1 className="text-center text-2xl dark:text-white pb-2 font-bold">
                  No cards added to this deck
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckDetails;
