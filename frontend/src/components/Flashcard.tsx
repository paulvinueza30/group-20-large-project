import { useEffect, useState } from "react";
import { useGetNextFlashcard } from "../hooks/flashcard/useGetNextFlashcard";
import { useParams } from "react-router-dom";
import { useCategories } from "../hooks/category/useCategories";
import { useReviewFlashcard } from "../hooks/flashcard/useReviewFlashcard";

// Work in Progress
type Feedback = "Forgot" | "Hard" | "Good" | "Easy";

// TODO: Flip animation and connect to API
function Flashcard() {
  const [showBackCard, setShowBackCard] = useState(false);
  const { categoryName } = useParams<{ categoryName: string }>();  

  // Get flashcard info
  const [category, setCategory] = useState<string>('default'); // Category state
  const { flashcard, loading, error, refetch } = useGetNextFlashcard(category); // Add refetch

  const { data } = useCategories();

  useEffect(() => {
    if (data && categoryName) {
      const category = data.find((category) => category.name === categoryName);
      if (category) {
        setCategory(category._id);
      }
    }
  }, [data, categoryName, flashcard]);

  // Review Flashcard
  const { reviewFlashcard, loadingFeedback, errorFeedback } = useReviewFlashcard();

  // Handle review and update the next flashcard
  const handleReview = async (feedback: Feedback) => {
    const flashcardId = flashcard?._id;
    if (flashcardId) {
      try {
        await reviewFlashcard(flashcardId, feedback);
        // After submitting feedback, fetch the next flashcard
        refetch(); // Trigger refetch of the next flashcard
        console.log(flashcardId)
        setShowBackCard(!showBackCard);
      } catch (err) {
        console.error('Error during review:', err);
      }
    } else {
      console.log("Flashcard ID is missing");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (loadingFeedback) return <p>Loading...</p>;
  // if (errorFeedback) return <p>Error: {errorFeedback}</p>;

  const buttonStyle =
    "text-white mt-4 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/5 p-3";

  const handleClick = () => {
    setShowBackCard(!showBackCard);
  };

  return (
    <div>
      {/* Front of card */}
      {!showBackCard && (
        <div className="dark:text-white">
          <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl">
            <h1 className="text-5xl text-center ">{flashcard?.frontSide}</h1>
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
      {showBackCard &&(
        <div className="dark:text-white">
          <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl">
            <h1 className="text-5xl text-center">{flashcard?.backSide}</h1>
          </div>

          {/* Feedback buttons */}
          <div className="flex justify-between">
          <button type="button" className={buttonStyle} onClick={() => handleReview("Forgot")} value="Forgot">
            Forgot
          </button>
          <button type="button" className={buttonStyle} onClick={() => handleReview("Hard")} value="Hard">
            Hard
          </button>
          <button type="button" className={buttonStyle} onClick={() => handleReview("Good")} value="Good">
            Good
          </button>
          <button type="button" className={buttonStyle} onClick={() => handleReview("Easy")} value="Easy">
            Easy
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flashcard;
