import React from "react";
import { useCategories } from "../../hooks/category/useCategories";

// Fix routing
function RecentDecks({ Pcolor, Scolor }: { Pcolor: string; Scolor: string }) {
  const { data, loading, error } = useCategories();

  const dataSize = data ? data.length : 0;
  const cardStyle = `relative rounded-xl w-2/5 h-3/6 p-16 mt-2`;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-hidden">
      <h3 className="text-center p-4  text-lg font-bold dark:text-white">
        Recent Decks
      </h3>
      <p className="text-center text-xl text-gray-500">
        {dataSize == 0 ? <p className="pt-24">No decks created</p> : ""}
      </p>
      <div className="flex flex-wrap justify-evenly content-stretch overflow-hidden">
        {/* Only maps up to 4 decks */}
        {data?.slice(0, 4).map((category) => (
          <React.Fragment key={category.name}>
            <a
              href={`/decks/${category.name}`}
              className={cardStyle}
              key={category._id}
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
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RecentDecks;
