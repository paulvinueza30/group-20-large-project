import Image from "../../assets/CreateCropped.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// TODO: Fix image size properly
function CreateDeck() {
  return (
    <div className="max-w-sm bg-slate-100">
      <img className="rounded-t-lg h-[250px] w-full" src={Image} />

      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold ">Create New Deck</h5>
        <div className="flex justify-between">
          <input
            placeholder="Enter Deck Name"
            className="text-lg pr-2 border-2"
            type="text"
          />
          <PlusCircleIcon className="w-10 bg-indigo-500 rounded-full text-white" />
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
