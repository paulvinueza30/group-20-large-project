import React from "react";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import DeckSkeleton from "./DeckSkeleton";
import { Category } from "../../hooks/category/useCategories"; // Import the Category interface

interface RecentDecksProps {
  Pcolor: string;
  Scolor: string;
  categories: Category[] | null; // Use the imported Category interface
}

const RecentDecks: React.FC<RecentDecksProps> = ({ Pcolor, Scolor, categories }) => {
  const dataSize = categories ? categories.length : 0;
  const cardStyle = `relative rounded-xl w-2/5 h-3/6 p-16 mt-2`;

  if (!categories) {
    return (
      <div>
        <h3 className="text-center p-4 text-lg font-bold dark:text-white">
          Recent Decks
        </h3>
        <div className="flex flex-wrap justify-evenly content-stretch overflow-hidden">
          <DeckSkeleton />
          <DeckSkeleton />
          <DeckSkeleton />
          <DeckSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <h3 className="text-center p-4 text-lg font-bold dark:text-white">
        Recent Decks
      </h3>
      <p className="text-center text-xl text-gray-500">
        {dataSize === 0 ? <span className="pt-24">No decks created</span> : ""}
      </p>
      <div className="flex flex-wrap justify-evenly content-stretch overflow-hidden">
        {/* Only maps up to 4 decks */}
        {categories.slice(0, 4).map((category) => (
          <div
            key={category._id}
            style={{ backgroundColor: Pcolor }}
            className={cardStyle}
          >
            {/* Link to the review page for the selected deck */}
            <Link
              to={`/review/${category._id}`} // Use category._id in the URL for review
              state={{ categoryName: category.name }} // Pass category name in state
              className="w-max"
              style={{ backgroundColor: Pcolor }}
            >
              <h3 className="text-lg font-semibold absolute top-[5px] left-[12px] text-white">
                {category.name}
              </h3>
              <span
                className="absolute bottom-0 left-[12px] mb-2 p-1 pl-4 pr-4 rounded-full"
                style={{ backgroundColor: Scolor }}
              >
                number cards
              </span>
            </Link>
            <span className="absolute bottom-0 right-[12px] mb-2 z-50">
              <GoTrash
                className="w-8 h-8 text-secondary hover:text-white"
                onClick={() => console.log("deleted")}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDecks;
