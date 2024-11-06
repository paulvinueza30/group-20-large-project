import { useState } from "react";
// Work in Progress

// TODO: Flip animation and connect to API
function Flashcard() {
  //note for Maria: Flashcard is now spelled with lowercase "c" everywhere
  const [showBackCard, setShowBackCard] = useState(false);

  const buttonStyle =
    "text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3";

  const handleClick = () => {
    setShowBackCard(!showBackCard);
  };

  return (
    <div>
      {/* Front of card */}
      {!showBackCard && (
        <div className="">
          <div className="p-20 bg-slate-100 rounded-xl">
            <h1 className="text-5xl text-center">Front</h1>
            <div className="p-10 text-center">
              <h4>Question</h4>
            </div>
          </div>
          <div className="flex justify-between">
            <button type="button" className={buttonStyle}>
              Edit
            </button>
            <button type="button" className={buttonStyle} onClick={handleClick}>
              Show Answer
            </button>
            <button type="button" className={buttonStyle}>
              Suspend
            </button>
          </div>
        </div>
      )}
      {/* Back of card */}
      {showBackCard && (
        <div className="transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="p-20 bg-slate-100 rounded-xl">
            <h1 className="text-5xl text-center">Back</h1>
            <div className="p-10 text-center">
              <h4>Answer</h4>
            </div>
          </div>
          <button type="button" className={buttonStyle}>
            Forgot
          </button>
          <button type="button" className={buttonStyle}>
            Hard
          </button>
          <button type="button" className={buttonStyle} onClick={handleClick}>
            Good
          </button>
          <button type="button" className={buttonStyle}>
            Easy
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcard;
