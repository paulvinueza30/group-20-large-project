import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetNextFlashcard } from "../hooks/flashcard/useGetNextFlashcard";
import { useReviewFlashcard } from "../hooks/flashcard/useReviewFlashcard";
import Confetti from "react-confetti";
import { useUserProfile } from "../context/UserProfileContext";

type Feedback = "Forgot" | "Hard" | "Good" | "Easy";

function Flashcard() {
  const { userProfile } = useUserProfile();

  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86"; // Default color if no userProfile

  const buttonStyle =
    "text-white mt-4 bg-primary hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/5 p-3";

  const [showBackCard, setShowBackCard] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>(); // Get categoryId from URL parameters

  // Check that categoryId is not null or undefined before using it
  if (!categoryId) {
    throw new Error("Category ID is missing. Please try again.");
  }

  // Set category to use with useGetNextFlashcard
  const [category, setCategory] = useState<string>(categoryId);
  const { flashcard, loading, error, refetch } = useGetNextFlashcard(category);

  const { review, errorFeedback } = useReviewFlashcard();

  // Store the floating numbers in the state along with their position (stacked vertically)
  const [experienceNumbers, setFloatingNumbers] = useState<
    { id: number; value: number; top: number }[]
  >([]);

  // Function to handle adding a floating number with stacking
  const addFloatingNumber = (value: number) => {
    // Create a new floating number with a unique ID
    const newFloatingNumber = {
      id: Date.now(), // Unique ID based on timestamp
      value: value,
      top: experienceNumbers.length * 25 + 300, // Stack vertically (space them by 25px)
    };

    // Add the new floating number to the state
    setFloatingNumbers((prevNumbers) => [...prevNumbers, newFloatingNumber]);

    // Remove the floating number after 2 seconds
    setTimeout(() => {
      setFloatingNumbers(
        (prevNumbers) =>
          prevNumbers.filter((num) => num.id !== newFloatingNumber.id) // Remove by ID
      );
    }, 2000);
  };

  const handleReview = async (feedback: Feedback) => {
    const flashcardId = flashcard?._id;
    if (flashcardId) {
      try {
        await review(flashcardId, feedback);
        if (feedback === "Forgot") {
          addFloatingNumber(0.25); // Add a new floating number
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

  const handleClick = () => {
    setShowBackCard(!showBackCard);
  };

  return (
    <>
      {/* XP Display*/}
      {experienceNumbers.map((num) => (
        <div
          key={num.id}
          className="absolute text-green-600 text-3xl font-bold animate-float z-50"
          style={{
            top: `${num.top}px`,
            left: "70%",
            transform: "translateX(-50%)",
          }}
        >
          + {num.value} xp
        </div>
      ))}
      <div className="relative">
        {errorFeedback && (
          <div className="fixed bottom-10 right-10 border-b-4 border-red-500 bg-slate-100 h-32 flex p-10 rounded-xl">
            <h1 className="text-2xl font-semibold self-center">
              Feedback error: {errorFeedback}
            </h1>
          </div>
        )}

        {!showBackCard && (
          <div className="dark:text-white">
            <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-96 min-w-full flex justify-center items-center">
              <h1 className="text-5xl text-center">{flashcard?.frontSide}</h1>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
              >
                Edit
              </button>
              <button
                type="button"
                className={buttonStyle}
                onClick={handleClick}
                style={{ backgroundColor: Pcolor }}
              >
                Show Answer
              </button>
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {showBackCard && (
          <div className="dark:text-white">
            <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-96 min-w-full flex justify-center items-center">
              <h1 className="text-5xl text-center">{flashcard?.backSide}</h1>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
                onClick={() => handleReview("Forgot")}
              >
                Forgot
              </button>
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
                onClick={() => handleReview("Hard")}
              >
                Hard
              </button>
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
                onClick={() => handleReview("Good")}
              >
                Good
              </button>
              <button
                type="button"
                className={buttonStyle}
                style={{ backgroundColor: Pcolor }}
                onClick={() => handleReview("Easy")}
              >
                Easy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Flashcard;
