import SideGrid from "../components/SideGrid";

// TODO: Add components
function Decks() {
  return (
    <>
      <div className="flex">
        <SideGrid />

        <div className="flex w-full ml-20">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="border-2 h-full w-full">Decks Page</div>
            <div className="border-2 h-full grid grid-rows-2">
              <div className="border">grid col 2 container</div>
              <div className="border flex-grow">grid col2 container 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Decks;
