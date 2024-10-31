function RecentDecks() {
  const deckInfo = [
    { name: "Programming Languages", count: 10 },
    { name: "Algorithms", count: 34 },
    { name: "Linux", count: 6 },
    { name: "Computer Science", count: 20 },
  ];
  const cardStyle = `relative rounded-xl w-2/5 h-3/6 p-16 bg-purple-600 md:h-2/6${
    deckInfo.length < 3 ? "m-6" : "m-4 md:mb-2"
  }`;

  return (
    <div>
      <h3 className="text-center p-4 text-lg font-bold">Recent Decks</h3>
      <div className="flex flex-wrap justify-evenly content-stretch">
        {deckInfo.map(({ name, count }) => (
          <a href="/decks" className={cardStyle} key={name}>
            <h3 className="text-lg font-semibold absolute top-[5px] left-[12px] text-white">
              {name}
            </h3>
            <span className="absolute bottom-0 left-[12px] mb-2 p-1 pl-4 pr-4 rounded-full bg-tertiary">
              {count} cards
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default RecentDecks;
