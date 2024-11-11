import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { getAllCategories } from "../services/categoryApi";
import { ICategory } from "../interfaces/ICategory"; // Import ICategory

function Decks() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then(response => setCategories(response))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleReviewClick = (categoryId: string, categoryName: string) => {
    // Programmatically navigate and pass state
    navigate(`/review/${categoryId}`, { state: { categoryName } });
  };

  return (
    <div>
      <h1>Select a Deck</h1>
      {categories.length > 0 ? (
        categories.map(category => (
          <div key={category._id} style={{ marginBottom: "1rem" }}>
            <h3>{category.name}</h3>
            <Link to={`/decks/${category._id}`} style={{ marginRight: "10px" }}>
              View All
            </Link>
            <button
              onClick={() => handleReviewClick(category._id, category.name)}
            >
              Review
            </button>
          </div>
        ))
      ) : (
        <p>No decks available.</p>
      )}
    </div>
  );
}

export default Decks;
