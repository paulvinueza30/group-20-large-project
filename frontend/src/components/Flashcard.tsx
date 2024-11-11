import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetNextFlashcard } from "../hooks/flashcard/useGetNextFlashcard";
import { useReviewFlashcard } from "../hooks/flashcard/useReviewFlashcard";
import Confetti from "react-confetti";

type Feedback = "Forgot" | "Hard" | "Good" | "Easy";

function Flashcard() {
  const buttonStyle =
    "text-white mt-4 bg-primary hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/5 p-3";

  const [showBackCard, setShowBackCard] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>(); // Get categoryId from URL parameters
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Default Category"; // Fallback for categoryName

  // Check that categoryId is not null or undefined before using it
  if (!categoryId) {
    throw new Error("Category ID is missing. Please try again.");
  }

  // Set category to use with useGetNextFlashcard
  const [category, setCategory] = useState<string>(categoryId);
  const { flashcard, loading, error, refetch } = useGetNextFlashcard(category, {
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const { review, loadingFeedback, errorFeedback } = useReviewFlashcard();

  const handleReview = async (feedback: Feedback) => {
    const flashcardId = flashcard?._id;
    if (flashcardId) {
      try {
        await review(flashcardId, feedback);
        setShowBackCard(false);
        refetch();
      } catch (err) {
        console.error("Error during review:", err);
      }
    } else {
      console.log("Flashcard ID is missing");
    }
  };

  if (loading)
    return (
      <div className="">
        <div className="p-20 bg-gray-300 dark:bg-gray-600 rounded-xl min-h-[300px] animate-pulse flex justify-center items-center">
          <span className="loader"></span>
        </div>
      </div>
    );

  if (error === "No flashcards due for review in this category") {
    return (
      <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-[300px] flex justify-center flex-col">
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

  if (loadingFeedback) return <p>Loading...</p>;
  if (errorFeedback) return <p>Error: {errorFeedback}</p>;

  const handleClick = () => {
    setShowBackCard(!showBackCard);
  };

  return (
    <div>
      <h2 className="text-center text-lg font-bold">{categoryName}</h2> {/* Display category name */}
      {!showBackCard && (
        <div className="dark:text-white">
          <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl">
            <h1 className="text-5xl text-center">{flashcard?.frontSide}</h1>
          </div>
          <div className="flex justify-between">
            <button type="button" className={buttonStyle}>
              Edit
            </button>
            <button type="button" className={buttonStyle} onClick={handleClick}>
              Show Answer
            </button>
            <button type="button" className={buttonStyle}>
              Delete
            </button>
          </div>
        </div>
      )}

      {showBackCard && (
        <div className="dark:text-white">
          <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl">
            <h1 className="text-5xl text-center">{flashcard?.backSide}</h1>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className={buttonStyle}
              onClick={() => handleReview("Forgot")}
            >
              Forgot
            </button>
            <button
              type="button"
              className={buttonStyle}
              onClick={() => handleReview("Hard")}
            >
              Hard
            </button>
            <button
              type="button"
              className={buttonStyle}
              onClick={() => handleReview("Good")}
            >
              Good
            </button>
            <button
              type="button"
              className={buttonStyle}
              onClick={() => handleReview("Easy")}
            >
              Easy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flashcard;
