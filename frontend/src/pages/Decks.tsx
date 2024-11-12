import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { getAllCategories } from "../services/categoryApi";
import { ICategory } from "../interfaces/ICategory"; // Import ICategory
import SideGrid from "../components/sidebar/SideGrid";
import { useUserProfile } from "../context/UserProfileContext";
import "../index.css";

function Decks() {
  const { userProfile } = useUserProfile();

  const Pcolor = userProfile ? userProfile.colorPreferences.primary : "#5C0B86"; // Default color if no userProfile

  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then((response) => setCategories(response))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleReviewClick = (categoryId: string, categoryName: string) => {
    // Programmatically navigate and pass state
    navigate(`/review/${categoryId}`, { state: { categoryName } });
  };

  const catSize = categories.length;

  if (!userProfile) {
    return <div>Loading...</div>; // Render loading state only if userProfile is not available
  }

  return (
    <div className="flex">
      <SideGrid color={Pcolor} />
      <div className="flex w-full ml-20">
        <div className="grid grid-cols-8 auto-rows-[100px] gap-6 w-full">
          <div className=" h-full w-full col-span-6">
            <h1 className="font-bold text-2xl dark:text-white pt-14">
              Deck Selection (WIP)
            </h1>
          </div>
          <div className="col-span-3 col-start-2 row-span-5 row-start-2">
            {catSize > 0 ? (
              categories.slice(0, catSize / 2).map((category, index) => (
                <div
                  key={category._id}
                  className={`bg-cover mb-8 rounded-xl shadow-lg h-72 relative flex w-full ${
                    index % 2 === 0 ? "bg1" : "bg2"
                  }`}
                >
                  <h3 className="text-4xl text-start ml-6 uppercase font-bold relative -bottom-44 ">
                    {category.name}
                  </h3>
                  <div className="flex justify-start ml-6 absolute bottom-6">
                    <Link
                      to={`/decks/${category._id}`}
                      style={{ backgroundColor: Pcolor }}
                      className=" text-white text-xl rounded-xl px-5 py-2"
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
                </div>
              ))
            ) : (
              <p>No decks available.</p>
            )}
          </div>
          <div className="col-span-3 col-start-5">
            {catSize > 0 ? (
              categories.slice(catSize / 2, catSize).map((category, index) => (
                <div
                  key={category._id}
                  className={`mb-8 bg-cover rounded-xl shadow-lg h-72 relative flex w-full  ${
                    index % 2 === 1 ? "bg1" : "bg2"
                  }`}
                >
                  <h3 className="text-4xl text-start ml-6 uppercase font-bold relative -bottom-44 ">
                    {category.name}
                  </h3>
                  <div className="flex justify-start ml-6 absolute bottom-6">
                    <Link
                      to={`/decks/${category._id}`}
                      style={{ backgroundColor: Pcolor }}
                      className="mr-2 text-white text-xl rounded-xl px-5 py-2"
                    >
                      View All
                    </Link>
                    <button
                      style={{ backgroundColor: Pcolor }}
                      className=" text-white text-xl rounded-xl px-5 py-2"
                      onClick={() =>
                        handleReviewClick(category._id, category.name)
                      }
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decks;
