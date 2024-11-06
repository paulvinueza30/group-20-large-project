import Image from "../../assets/CreateCropped.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
<<<<<<< HEAD
import { useCreateCategory } from "../../hooks/category/useCreateCategories";
import { useState } from "react";

// TODO: Fix image size properly, work on the button and connection
function CreateDeck() {
  const { loading, error, success, create } = useCreateCategory();
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await create(categoryName);
  };

  return (
    <div>
      <div className="max-w-sm bg-slate-100 dark:bg-slate-600">
        <img className="rounded-t-lg h-[250px] w-full" src={Image} />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold ">Create New Deck</h5>
          <div className="flex justify-between">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Deck name"
                className="w-4/5 rounded-md p-1 bg-purple-200 text-black relative"
                required
              />
              <div className="flex relative float-end">
                <button type="submit" disabled={loading}>
                  <PlusCircleIcon className="w-8 bg-indigo-500 rounded-full text-white float-end" />
                </button>
              </div>
            </form>

            {/* Change to a notification box */}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {success && (
              <p style={{ color: "green" }}>Category created successfully!</p>
            )}
          </div>
=======

// TODO: Fix image size properly, work on the button and connection
function CreateDeck() {
  return (
    <div className="max-w-sm bg-slate-100 dark:bg-slate-600">
      <img className="rounded-t-lg h-[250px] w-full" src={Image} />

      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold ">Create New Deck</h5>
        <div className="flex justify-between">
          <input
            placeholder="Enter Deck Name"
            className="text-lg pr-2 border-2 dark:bg-slate-200"
            type="text"
          />
          <PlusCircleIcon className="w-10 bg-indigo-500 rounded-full text-white" />
>>>>>>> d2f7cbe (Restore local changes after .git folder replacement)
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
