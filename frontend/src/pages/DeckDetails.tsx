import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllFlashcards, deleteFlashcard } from "../services/flashCardApi";
import FlashcardDisplay from "../components/FlashcardDisplay";
import AddFlashcard from "../components/AddFlashcard"; // Import AddFlashcard
import { IFlashcard } from "../interfaces/IFlashcard";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useUserProfile } from "../context/UserProfileContext";

function DeckDetails() {
  const { userProfile } = useUserProfile();
  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86"; 
  const { categoryId } = useParams<{ categoryId?: string }>(); 
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  // Fetch all flashcards for the specified category
  const fetchFlashcards = async () => {
    if (categoryId) {
      try {
        const response = await getAllFlashcards(categoryId); // API should return {categoryName, flashcards}
        setFlashcards(response.flashcards); // Set flashcards array
        setCategoryName(response.categoryName); // Set category name
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [categoryId]);

  // Update a flashcard
  const handleUpdateFlashcard = (updatedFlashcard: IFlashcard) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((card) =>
        card._id === updatedFlashcard._id ? updatedFlashcard : card
      )
    );
  };

  // Delete a flashcard
  const handleDeleteFlashcard = async (flashcardId: string) => {
    try {
      await deleteFlashcard(flashcardId);
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((card) => card._id !== flashcardId)
      );
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  if (!categoryId) {
    return <div>Error: Invalid category ID</div>;
  }

  return (
    <div className="flex">
      <SideGrid />
      <div className="w-full ml-20 mr-[30px]">
        <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
          <div className="col-span-6 row-span-1 col-start-1 row-start-1">
            <div className="pt-8 text-sm flex flex-col text-gray-400">
              <HomeIcon className="h-[15px] w-[15px]" /> / Decks / {categoryName || "this deck"}
            </div>
            <h1 className="font-bold text-2xl dark:text-white">
              All cards from {categoryName || "this deck"}
            </h1>
          </div>

          {/* AddFlashcard Component */}
          <div className="col-span-6 row-span-1 col-start-1 row-start-2">
            <AddFlashcard
              color={Pcolor}
              categoryId={categoryId!} // Pass the current categoryId to AddFlashcard
              onFlashcardAdded={fetchFlashcards} // Add new flashcard directly to state
            />
          </div>

          {/* Flashcard List */}
          <div className="col-start-2 col-span-4 row-span-3 row-start-3 pt-20">
            {flashcards.length > 0 ? (
              flashcards.map((card) => (
                <FlashcardDisplay
                  key={card._id}
                  flashcard={card}
                  onDelete={() => handleDeleteFlashcard(card._id)}
                  onUpdate={handleUpdateFlashcard} // Update state on edit
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
