// DeckDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllFlashcards } from "../services/flashCardApi";
import FlashcardDisplay from "../components/FlashcardDisplay";
import { IFlashcard } from "../interfaces/IFlashcard";

function DeckDetails() {
  const { categoryId } = useParams<{ categoryId: string }>(); // Fetch categoryId from URL
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

  useEffect(() => {
    if (categoryId) {
      getAllFlashcards(categoryId)
        .then(response => setFlashcards(response))
        .catch(error => console.error("Error fetching flashcards:", error));
    }
  }, [categoryId]);

  return (
    <div>
      <h1>Flashcards for Category {categoryId}</h1>
      {flashcards.length > 0 ? (
        flashcards.map(card => (
          <FlashcardDisplay key={card._id} flashcard={card} />
        ))
      ) : (
        <p>No flashcards available in this category.</p>
      )}
    </div>
  );
}

export default DeckDetails;
