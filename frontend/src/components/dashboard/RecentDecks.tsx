import React from "react";
<<<<<<< HEAD
import { useCategories } from "../../hooks/category/useCategories";

// Fix routing
function RecentDecks({ Pcolor, Scolor }: any) {
  const { data, loading, error } = useCategories();

  const cardStyle = `relative rounded-xl w-2/5 h-3/6 p-16 mt-2`;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
=======

// TODO: connect to API
function RecentDecks({ Pcolor, Scolor }: any) {
  // Mockdata for testing
  const deckInfo = [
    { name: "Programming Languages", count: 10 },
    { name: "Algorithms", count: 34 },
    { name: "Linux", count: 6 },
    { name: "Computer Science", count: 20 },
  ];
  const cardStyle = `relative rounded-xl w-2/5 h-3/6 p-16 ${
    deckInfo.length < 3 ? "mx-6" : "mx-4 my-2"
  }`;
>>>>>>> d2f7cbe (Restore local changes after .git folder replacement)

  return (
    <div>
      <h3 className="text-center p-4  text-lg font-bold">Recent Decks</h3>
      <div className="flex flex-wrap justify-evenly content-stretch">
<<<<<<< HEAD
        {data?.map((category) => (
          <React.Fragment key={category.name}>
            <a
              href={`/decks`}
              className={cardStyle}
              key={category.id}
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
=======
        {deckInfo.map(({ name, count }) => (
          <a
            href="/decks"
            className={cardStyle}
            key={name}
            style={{ backgroundColor: Pcolor }}
          >
            <h3 className="text-lg font-semibold absolute top-[5px] left-[12px] text-white">
              {name}
            </h3>
            <span
              className="absolute bottom-0 left-[12px] mb-2 p-1 pl-4 pr-4 rounded-full"
              style={{ backgroundColor: Scolor }}
            >
              {count} cards
            </span>
          </a>
>>>>>>> d2f7cbe (Restore local changes after .git folder replacement)
        ))}
      </div>
    </div>
  );
}

export default RecentDecks;
