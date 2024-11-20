import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllCategories,
  deleteCategory,
  editCategory,
} from "../services/categoryApi";
import { ICategory } from "../interfaces/ICategory";
import SideGrid from "../components/sidebar/SideGrid";
import { useUserProfile } from "../context/UserProfileContext";
import { GoTrash, GoPencil } from "react-icons/go";
import { useCategories } from "../hooks/category/useCategories"; // Import updated useCategories hook
import "../index.css";

function Decks() {
  const { userProfile } = useUserProfile();
  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86";
  const Scolor = userProfile
    ? userProfile.colorPreferences.secondary
    : "#BA72E2";

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState(0); // Initialize refreshToken state

  const {
    data: categories,
    loading,
    error,
  } = useCategories(!!userProfile, refreshToken);
  const navigate = useNavigate();

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      setRefreshToken((prev) => prev + 1); // Trigger re-fetch
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategorySave = async (categoryId: string) => {
    try {
      await editCategory(categoryId, editedCategoryName);
      setRefreshToken((prev) => prev + 1); // Trigger re-fetch
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleReviewClick = (categoryId: string, categoryName: string) => {
    navigate(`/review/${categoryId}`, { state: { categoryName } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <div className="flex">
      <SideGrid color={Pcolor} />
      <div className="w-full ml-20 mr-[30px]">
        <div className="grid grid-cols-8 auto-rows-[100px] gap-6 w-full">
          <div className="h-full w-full col-span-8">
            <h1 className="font-bold text-2xl dark:text-white pt-14">
              Deck Selection
            </h1>
          </div>
          <div className="col-span-8 col-start-1 row-span-5 row-start-2 flex flex-row flex-wrap w-full justify-center">
            {categories?.map((category, index) => (
              <div
                key={category._id}
                className={`bg-cover m-4 rounded-xl shadow-lg h-72 relative w-96 mt-0 dark:text-white ${
                  index % 2 === 0
                    ? "bg1 dark:bg-[url('/src/assets/bgDark1.jpg')] "
                    : "bg2 dark:bg-[url('/src/assets/bgDark2.jpg')]"
                }`}
              >
                {editingCategoryId === category._id ? (
                  <div className="absolute top-6 left-6 w-full px-4">
                    <input
                      type="text"
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className="text-lg dark:text-white p-2 bg-gray-200 rounded w-3/4"
                    />
                    <button
                      onClick={() => handleEditCategorySave(category._id)}
                      style={{ backgroundColor: Pcolor }}
                      className="text-white px-4 py-2 rounded ml-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                      className="text-white px-4 py-2 rounded ml-2"
                      style={{ backgroundColor: Scolor }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-4xl text-start ml-6 uppercase font-bold relative -bottom-44">
                      {category.name}
                    </h3>
                    <div className="flex justify-start ml-6 absolute bottom-6">
                      <Link
                        to={`/decks/${category._id}`}
                        style={{ backgroundColor: Pcolor }}
                        className="text-white text-xl rounded-xl px-5 py-2"
                      >
                        View All
                      </Link>
                      <button
                        style={{ backgroundColor: Pcolor }}
                        className="ml-2 text-white text-xl rounded-xl px-5 py-2"
                        onClick={() =>
                          handleReviewClick(category._id, category.name)
                        }
                      >
                        Review
                      </button>
                    </div>
                    <span className="absolute right-6 top-6 flex">
                      <GoPencil
                        onClick={() => {
                          setEditingCategoryId(category._id);
                          setEditedCategoryName(category.name);
                        }}
                        style={{ color: Pcolor }}
                        className="w-6 h-6 mr-3 cursor-pointer"
                      />
                      <GoTrash
                        onClick={() => handleDeleteCategory(category._id)}
                        style={{ color: Scolor }}
                        className="w-6 h-6 cursor-pointer"
                      />
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decks;
