import { useState, useEffect } from "react";
import { useCreateFlashcard } from "../hooks/flashcard/useCreateFlashcard";
import { Link, useLocation } from "react-router-dom";

function AddFlashcard({ color }: any) {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  // Find the category ID based on the categoryName from URL params
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/"); // Split the URL into segments
    const idFromUrl = pathSegments[pathSegments.length - 1]; // Get the last segment as ID
    setCategoryId(idFromUrl); // Set the ID in the state
  }, [location.pathname]);

  // Create Flashcard API
  const { create, loading, error, success } = useCreateFlashcard();
  const [flashcardData, setFlashcardData] = useState({
    frontSide: "",
    backSide: "",
    category: categoryId,
  });

  // Handle changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlashcardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ensure category is set before submitting
    if (!categoryId) {
      console.error("Category ID is not set.");
      return;
    }
    if (flashcardData.frontSide && flashcardData.backSide && categoryId) {
      const flashcardWithCategory = {
        ...flashcardData,
        categoryId: categoryId,
      };
      try {
        await create(flashcardWithCategory);
        console.log("Flashcard submitted:", flashcardWithCategory);

        // Reset form after successful submission
        setFlashcardData({
          frontSide: "",
          backSide: "",
          category: categoryId, // Keep category unchanged after reset
        });

        // Close the modal after submission
        setShowModal(false);
      } catch (err) {
        console.error("Error creating flashcard:", err);
      }
    } else {
      console.log("Please fill in all required fields.");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          style={{ backgroundColor: color }}
          className=" text-white active:bg-purple-800 font-bold uppercase text-sm rounded-full p-4 px-6 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Flashcard
        </button>
        <Link
          to={`/decks/${categoryId}`}
          style={{ backgroundColor: color }}
          className="text-white active:bg-purple-800 font-bold uppercase text-sm rounded-full p-4 px-6 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          View All Cards
        </Link>
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Modal Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New Flashcard</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span>&times;</span> {/* Close icon */}
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Modal Body */}
                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      name="frontSide"
                      placeholder="Front"
                      className="border-2 w-full p-2 mb-3"
                      value={flashcardData.frontSide}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="backSide"
                      placeholder="Back"
                      className="border-2 w-full p-2 mb-3"
                      value={flashcardData.backSide}
                      onChange={handleChange}
                      required
                    />
                    <div style={{ color: "red" }} className="pt-2 ml-2">
                      {error && <p>{error}</p>}
                    </div>
                    {loading && <p>Loading...</p>}
                    {success && <p>Flashcard added successfully!</p>}
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default AddFlashcard;
