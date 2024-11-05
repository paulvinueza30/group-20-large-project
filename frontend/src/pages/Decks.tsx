import SideGrid from "../components/sidebar/SideGrid";
import FlashCard from "../components/FlashCard";
import { HomeIcon } from "@heroicons/react/24/outline";
import AddFlashcard from "../components/AddFlashcard";


// TODO: Pop-Up for create flashcard
function Decks() {
  return (
    <>
      <div className="flex justify-start">
        <SideGrid />
        <div className="ml-20 mr-[30px] w-full">
          <div className="grid grid-cols-6 grid-rows-8 lg:gap-x-[30px] lg:gap-y-[30px] max-h-shv">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
            <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Decks / Deck Name
              </div>
              <h1 className="font-bold text-2xl dark:text-white">
                Deck name
              </h1>
            </div>
            <div className="col-span-3 row-span-1 col-start-5 row-start-2 float-end">
              <AddFlashcard /> 
            </div>
            <div className="col-span-4 row-span-4 col-start-2 row-start-3">
              <FlashCard />
            </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Decks;
