import Image from "../../assets/CreateCropped.png";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCreateCategory } from "../../hooks/category/useCreateCategories";
import { useState } from "react";
import { Category } from "../../hooks/category/useCategories";

interface CreateDeckProps {
  Pcolor: string;
  Scolor: string;
  onCategoryCreated: (newCategory: Category) => void;
}

function CreateDeck({ Pcolor, Scolor: _, onCategoryCreated }: CreateDeckProps) {
  const { loading, error, success, create } = useCreateCategory();
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCategory = await create(categoryName); // Now this should return the new category
    if (newCategory) {
      onCategoryCreated(newCategory);
      setCategoryName("");
    }
  };

  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const sanitizedHex = hex.replace("#", "");
    const bigint = parseInt(sanitizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  // Adjust hue rotation based on color tones
  const getHueRotation = (color: string) => {
    const { r, g, b } = hexToRgb(color);

    if (g > r && g > b) {
      return 160; // Yellow/green tones
    } else if (b > r && b > g) {
      return 10; // Blue tones
    } else if (r > g && r > b) {
      return 50; // Red tones
    }
    return 250; // Neutral/default case
  };

  const hueRotation = getHueRotation(Pcolor);

  return (
    <div className="flex justify-center relative">
      <div className="max-w-sm bg-slate-100 dark:bg-dark-primary overflow-hidden  transition-all">
        <div className="relative">
          <img
            className="h-full w-full object-cover transition-all duration-500 ease-in-out"
            src={Image}
            alt="Create Deck"
            style={{ filter: `hue-rotate(${hueRotation}deg)` }}
          />
          <div
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              backgroundColor: Pcolor,
              mixBlendMode: "multiply",
              opacity: 0.4,
            }}
          ></div>
        </div>

        <div className="p-5 absolute -bottom-20 right-0 bg-slate-100 dark:bg-dark-primary w-full">
          <h5
            className="mb-2 text-xl font-bold dark:text-white transition-colors duration-300"
            style={{ color: Pcolor }}
          >
            Create New Deck
          </h5>

          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-center"
          >
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Deck name"
              className="w-4/5 rounded-md p-2 bg-gray-100 text-gray-900 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 dark:bg-slate-500 dark:border-none "
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="ml-3 p-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-opacity-90"
              style={{
                backgroundColor: Pcolor,
              }}
            >
              <PlusCircleIcon className="w-8 text-white" />
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">Error: {error}</p>}
          {success && (
            <p className="text-green-500 mt-4">
              Category created successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
