import Image from "../../assets/CreateCropped.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function CreateDeck() {
  return (
    <div className="max-w-sm bg-slate-100">
      <a href="#">
        <img
          className="rounded-t-lg h-[350px] w-full"
          src={Image}
          alt=""
          sizes=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold ">Create New Deck</h5>
        </a>
        <a href="#" className="inline-flex items-end p-2">
          <input
            placeholder="Enter Deck Name"
            className="text-lg pr-2 border-2"
            type="text"
          />
          <PlusCircleIcon className="w-10 bg-indigo-500 rounded-full text-white" />
        </a>
      </div>
    </div>
  );
}

export default CreateDeck;
