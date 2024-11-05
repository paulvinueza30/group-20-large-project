import { Request, Response } from "express";
import flashCard from "../models/flashCardModel";
import Category from "../models/categoryModel";
import QueueController from "../services/queueController";  // Import the QueueController

// Instantiate QueueController
const queueController = new QueueController();

// Create flashCard
export const createFlashCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { frontSide, backSide, category } = req.body;

    if (!category) {
      res.status(400).json({ message: "Category is required" });
      return;
    }

    // Look for the category in the database
    const categoryDoc = await Category.findOne({ name: category.toLowerCase() });
    if (!categoryDoc) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Create the flashcard with the category's ObjectId reference
    const newFlashCard = new flashCard({
      frontSide,
      backSide,
      category: categoryDoc._id,  // Use the ObjectId of the existing category
    });

    await newFlashCard.save();
    res.status(201).json({
      message: "Flashcard created successfully in category",
      flashCard: newFlashCard,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Flashcard", error });
  }
};



// Edit flashCard
export const editFlashCard = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const { frontSide, backSide } = req.body;

      // Prepare the update data object, excluding the category
      const updateData = {
          ...(frontSide && { frontSide }),
          ...(backSide && { backSide }),
          editedAt: Date.now(),
      };

      const updatedFlashCard = await flashCard.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedFlashCard) {
          res.status(404).json({ message: "Flashcard not found" });
          return;
      }

      res.status(200).json({ message: "FlashCard updated successfully", flashCard: updatedFlashCard });
  } catch (error) {
      res.status(500).json({ message: "Failed to update flashcard", error });
  }
};

// Delete flashCard
export const deleteFlashCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedFlashCard = await flashCard.findByIdAndDelete(id);

        if (!deletedFlashCard) {
            res.status(404).json({ message: "Flashcard not found" });
            return;
        }
        res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete flashcard", error });
    }
};

// Get the next flashcard due for review
export const getNextFlashCard = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query;  // Retrieve category from query parameter

  if (!category || typeof category !== "string") {
    res.status(400).json({ message: "Category is required and must be a string" });
    return;
  }

  try {
    // Initialize queue for the specified category
    await queueController.initializeQueue(category);

    // Get the next flashcard due for review
    const nextCard = queueController.getNextCard();

    if (!nextCard) {
      res.status(404).json({ message: "No flashcards due for review in this category" });
      return;
    }

    res.json(nextCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flashcard", error });
  }
};

// Review a flashcard and update its due date based on feedback
export const reviewFlashCard = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { feedback } = req.body;

    // Validate feedback
    if (!['Forgot', 'Hard', 'Good', 'Easy'].includes(feedback)) {
        res.status(400).json({ message: "Invalid feedback" });
        return;
    }

    try {
        await queueController.reviewCard(id, feedback);  // Update flashcard due date and reinsert in queue
        res.json({ message: "Flashcard reviewed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error reviewing flashcard", error });
    }
};


// import { Request, Response } from "express";
// import flashCard from "../models/flashCardModel";

// class DummyQueueController {
//   initializeQueue() {
//     // Dummy implementation
//     console.log("Queue initialized");
//   }

//   getNextCard() {
//     // Dummy implementation, returns a mock flashcard
//     return {
//       id: "mockId",
//       frontSide: "Dummy Front",
//       backSide: "Dummy Back",
//       category: "Dummy Category",
//     };
//   }

//   reviewCard(id: string, feedback: string) {
//     // Dummy implementation
//     console.log(`Reviewed card ${id} with feedback: ${feedback}`);
//     // Simulate updating due date logic
//   }
// }

// // Instantiate DummyQueueController
// const queueController = new DummyQueueController();
// queueController.initializeQueue();

// // Create flashCard
// export const createFlashCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { frontSide, backSide, category } = req.body;
//     const newFlashCard = new flashCard({ frontSide, backSide, category });
//     await newFlashCard.save();
//     res.status(201).json({
//       message: "Flashcard created successfully",
//       flashCard: newFlashCard,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create Flashcard", error });
//   }
// };

// // Edit flashCard
// export const editFlashCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const updateData = {
//       ...req.body,
//       editedAt: Date.now(),
//     };
//     const updatedFlashCard = await flashCard.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     if (!updatedFlashCard) {
//       res.status(404).json({ message: "Flashcard not found" });
//       return;
//     }
//     res.status(200).json({
//       message: "FlashCard updated successfully",
//       flashCard: updatedFlashCard,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update flashcard", error });
//   }
// };

// // Delete flashCard
// export const deleteFlashCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const deletedFlashCard = await flashCard.findByIdAndDelete(id);

//     if (!deletedFlashCard) {
//       res.status(404).json({ message: "Flashcard not found" });
//       return;
//     }
//     res.status(200).json({ message: "Flashcard deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete flashcard", error });
//   }
// };

// // Get the next flashcard due for review
// export const getNextFlashCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const nextCard = queueController.getNextCard(); // Retrieve the next due flashcard

//     if (!nextCard) {
//       res.status(404).json({ message: "No flashcards due for review" });
//       return;
//     }
//     res.json(nextCard);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching flashcard", error });
//   }
// };

// // Review a flashcard and update its due date based on feedback
// export const reviewFlashCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const { feedback } = req.body;

//   // Validate feedback
//   if (!["Forgot", "Hard", "Good", "Easy"].includes(feedback)) {
//     res.status(400).json({ message: "Invalid feedback" });
//     return;
//   }

//   try {
//     queueController.reviewCard(id, feedback); // Update flashcard due date and reinsert in queue
//     res.json({ message: "Flashcard reviewed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error reviewing flashcard", error });
//   }
// };
