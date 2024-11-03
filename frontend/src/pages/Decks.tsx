import { useState } from "react";
import SideGrid from "../components/sidebar/SideGrid";
import FlashCard from "../components/FlashCard";

// TODO: Add components
function Decks() {
  // Handles the show answer buttton
  const [showBackCard, setShowBackCard] = useState(false);

  return (
    <>
      <div className="flex justify-start">
        <SideGrid />
        <div className="ml-20 mr-[30px] w-full">
          <div className="grid grid-cols-6 grid-rows-8 lg:gap-x-[30px] lg:gap-y-[30px] min-h-screen overflow-hidden">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <h1 className="font-bold text-4xl pt-14 ">Deck - Name of Deck</h1>
            </div>
            <div className="col-span-4 row-span-3 col-start-2 row-start-2 border-2">
              <div>
                <FlashCard />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4"
                  onClick={() => setShowBackCard(true)}
                >
                  Show Answer
                </button>
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4"
                >
                  Suspend
                </button>
              </div>
            </div>
            <div className="flex col-span-4 row-span-1 col-start-2 row-start-5 border-2 content-start"></div>

            {showBackCard && (
              <div className="col-span-4 row-span-3 col-start-2 row-start-5 border-2">
                Back Of Card
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setShowBackCard(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="col-span-4 row-span-1 col-start-2 row-start-8 border-2 flex justify-between items-start">
              {showBackCard && (
                <>
                  <button
                    type="button"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3"
                  >
                    Again
                  </button>
                  <button
                    type="button"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3"
                    onClick={() => setShowBackCard(true)}
                  >
                    Hard
                  </button>
                  <button
                    type="button"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3"
                  >
                    Good
                  </button>
                  <button
                    type="button"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                   focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600
                    dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/4 p-3"
                  >
                    Easy
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Decks;
