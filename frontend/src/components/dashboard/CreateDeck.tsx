import Image from "../../assets/CreateCropped.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
  if (success) {
    window.location.reload();
  }

  return (
    <div>
      <div className="max-w-sm bg-slate-100 dark:bg-dark-primary">
        <img className="rounded-t-lg h-[250px] w-full" src={Image} />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold dark:text-white">
            Create New Deck
          </h5>
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
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
