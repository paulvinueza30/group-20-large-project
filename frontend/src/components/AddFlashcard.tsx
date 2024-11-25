import { useState } from "react";
import { useCreateFlashcard } from "../hooks/flashcard/useCreateFlashcard";

interface AddFlashcardProps {
  color: string; // Button color
  categoryId: string; // Category ID to associate with the flashcard
  onFlashcardAdded: () => void; // Trigger refetch after adding a card
}

function AddFlashcard({ color, categoryId, onFlashcardAdded }: AddFlashcardProps) {
  const { create, loading, error } = useCreateFlashcard();
  const [flashcardData, setFlashcardData] = useState({
    frontSide: "",
    backSide: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlashcardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await create({ ...flashcardData, categoryId: categoryId }); // Create flashcard
      onFlashcardAdded(); // Notify parent to refetch all flashcards
      setFlashcardData({ frontSide: "", backSide: "" }); // Reset form
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-100 rounded-lg">
      <input
        type="text"
        name="frontSide"
        placeholder="Front Side"
        value={flashcardData.frontSide}
        onChange={handleChange}
        required
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="backSide"
        placeholder="Back Side"
        value={flashcardData.backSide}
        onChange={handleChange}
        required
        className="mb-2 p-2 border"
      />
      <button type="submit" style={{ backgroundColor: color }} className="text-white p-2 rounded">
        Add Flashcard
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default AddFlashcard;
