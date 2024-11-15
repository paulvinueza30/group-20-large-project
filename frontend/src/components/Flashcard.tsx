// src/components/Flashcard.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useGetNextFlashcard } from "../hooks/flashcard/useGetNextFlashcard";
import { useReviewFlashcard } from "../hooks/flashcard/useReviewFlashcard";
import { useUserProfile } from "../context/UserProfileContext";
import Button from "../components/flashcard/Button";
import FlashcardSide from "../components/flashcard/FlashcardSide";
import FloatingXP from "../components/flashcard/FloatingXP";
import { useFloatingNumbers } from "../hooks/flashcard/useFloatingNumber";
import Loader from "../components/flashcard/Loader";
import ErrorFeedback from "../components/flashcard/ErrorFeedback";

type Feedback = "Forgot" | "Hard" | "Good" | "Easy";

const Flashcard: React.FC = () => {
  const { userProfile } = useUserProfile();
  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86";

  const [showBackCard, setShowBackCard] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>();
  const { flashcard, loading, error, refetch } = useGetNextFlashcard(
    categoryId || ""
  );
  const { review, errorFeedback } = useReviewFlashcard();

  const { experienceNumbers, addFloatingNumber } = useFloatingNumbers();

  const handleReview = async (feedback: Feedback) => {
    const flashcardId = flashcard?._id;
    if (flashcardId) {
      try {
        await review(flashcardId, feedback);
        if (feedback === "Forgot") {
          addFloatingNumber(0.25);
        } else if (feedback === "Hard") {
          addFloatingNumber(0.5);
        } else if (feedback === "Good") {
          addFloatingNumber(0.75);
        } else if (feedback === "Easy") {
          addFloatingNumber(1);
        }
        setShowBackCard(false);
        refetch();
      } catch (err) {
        console.error("Error during review:", err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error === "No flashcards left in this category") {
    return (
      <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-[450px] flex justify-center flex-col">
        <Confetti recycle={false} />
        <h1 className="text-center text-2xl dark:text-white pb-2 border-b font-bold">
          You have finished this deck.
        </h1>
        <h3 className="text-center text-2xl dark:text-white pt-4">
          Come back tomorrow or add more cards to the deck.
        </h3>
      </div>
    );
  } else if (error) {
    return <p className="dark:text-white">Error: {error}</p>;
  }

  return (
    <>
      <FloatingXP experienceNumbers={experienceNumbers} />
      <div className="relative">
        {errorFeedback && <ErrorFeedback message={errorFeedback} />}

        {!showBackCard ? (
          <FlashcardSide content={flashcard?.frontSide} />
        ) : (
          <FlashcardSide content={flashcard?.backSide} />
        )}

        {!showBackCard && (
          <div className="flex justify-between">
            <Button text="Edit" style={{ backgroundColor: Pcolor }} />
            <Button
              text="Show Answer"
              onClick={() => setShowBackCard(!showBackCard)}
              style={{ backgroundColor: Pcolor }}
            />
            <Button text="Delete" style={{ backgroundColor: Pcolor }} />
          </div>
        )}

        {showBackCard && (
          <div className="flex justify-between">
            <Button
              text="Forgot"
              onClick={() => handleReview("Forgot")}
              style={{ backgroundColor: Pcolor }}
            />
            <Button
              text="Hard"
              onClick={() => handleReview("Hard")}
              style={{ backgroundColor: Pcolor }}
            />
            <Button
              text="Good"
              onClick={() => handleReview("Good")}
              style={{ backgroundColor: Pcolor }}
            />
            <Button
              text="Easy"
              onClick={() => handleReview("Easy")}
              style={{ backgroundColor: Pcolor }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Flashcard;
