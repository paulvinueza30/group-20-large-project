import { useEffect, useState } from "react";
import { useGetNextFlashcard } from "../hooks/flashcard/useGetNextFlashcard";
import { useParams } from "react-router-dom";
import { useCategories } from "../hooks/category/useCategories";
import { useReviewFlashcard } from "../hooks/flashcard/useReviewFlashcard";
import Confetti from "react-confetti";

// Work in Progress
type Feedback = "Forgot" | "Hard" | "Good" | "Easy";

function Flashcard() {
  const buttonStyle =
    "text-white mt-4 bg-primary hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/5 p-3";

  const [showBackCard, setShowBackCard] = useState(false);
  const { categoryName } = useParams<{ categoryName: string }>();

  // Get flashcard info
  const [category, setCategory] = useState<string>("default"); // Category state
  const { flashcard, loading, error, refetch } = useGetNextFlashcard(category, {
    refetchOnWindowFocus: true, // Ensures refetch when window refocuses
    staleTime: 0, // Data is considered stale immediately
  });

  const { data } = useCategories(true);

  useEffect(() => {
    if (data && categoryName) {
      const category = data.find((category) => category.name === categoryName);
      if (category) {
        setCategory(category._id);
      }
    }
  }, [data, categoryName]);

  // Review Flashcard
  const { review, loadingFeedback, errorFeedback } = useReviewFlashcard();

  // Handle review and update the next flashcard
  const handleReview = async (feedback: Feedback) => {
    const flashcardId = flashcard?._id;
    if (flashcardId) {
      try {
        await review(flashcardId, feedback);
        setShowBackCard(false); // Reset back card state after review
        console.log(flashcard);
        refetch(); // Trigger refetch of the next flashcard
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
        {/* <div className="flex justify-between">
          <div className={`${buttonStyle} animate-pulse h-10`}></div>
          <div className={`${buttonStyle} animate-pulse`}></div>
          <div className={`${buttonStyle} animate-pulse`}></div>
        </div> */}
      </div>
    );

  // If there are no more cards in the deck
  if (error == "No flashcards due for review in this category") {
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
      {/* Front of card */}
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

      {/* Back of card */}
      {showBackCard && (
        <div className="dark:text-white">
          <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl">
            <h1 className="text-5xl text-center">{flashcard?.backSide}</h1>
          </div>

          {/* Feedback buttons */}
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
