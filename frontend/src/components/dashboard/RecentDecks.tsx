import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import DeckSkeleton from "./DeckSkeleton";
import { Category } from "../../hooks/category/useCategories"; // Import the Category interface

interface RecentDecksProps {
  Pcolor: string;
  Scolor: string;
  categories: Category[] | null; // Use the imported Category interface
}

const RecentDecks: React.FC<RecentDecksProps> = ({
  Pcolor,
  Scolor,
  categories,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dataSize = categories ? categories.length : 0;
  const cardStyle = `relative rounded-xl w-2/5 h-2/6 z-1 mb-6`;

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index); // Set the index of the hovered item
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset hover state when mouse leaves
  };

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
        {categories.slice(0, 6).map((category, index) => (
          <div
            key={category._id}
            style={{ backgroundColor: Pcolor }}
            className={`flex flex-col ${cardStyle} `}
          >
            {/* Link to the review page for the selected deck */}
            <Link
              to={`/review/${category._id}`} // Use category._id in the URL for review
              state={{ categoryName: category.name }} // Pass category name in state
              className={`${cardStyle} p-9 mt-4 w-full`}
              style={{ backgroundColor: Pcolor }}
            >
              <h3 className="text-lg font-semibold absolute top-[5px] left-[12px] text-white">
                {category.name}
              </h3>
            </Link>
            <div className="relative flex rounded-xl p-5 mb-2">
              <span
                className="absolute bottom-0 left-[12px] mb-2 p-1 pl-4 pr-4 rounded-full"
                style={{ backgroundColor: Scolor }}
              >
                <span className="font-bold">{category.cardCount}</span> cards
              </span>
              <span className="mb-2 absolute right-4 bottom-0">
                <GoTrash
                  onMouseEnter={() => handleMouseEnter(index)} // Set the index when hovering
                  onMouseLeave={handleMouseLeave}
                  style={{
                    color: hoveredIndex === index ? "white" : Scolor, // Change color based on hover state
                  }}
                  className="w-10 h-10 text-secondary z-10"
                  onClick={() => console.log("deleted")}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDecks;
