import flashcard from '../models/flashcardModel';  // Mongoose model
import Category from "../models/categoryModel";
import { IFlashcard } from '../interfaces/IFlashcard';  // TypeScript interface for typing
import { MinHeap } from "./minHeap";  // MinHeap utility from services
import mongoose from 'mongoose';

class QueueController {
    private queue: MinHeap<IFlashcard>;

    constructor() {
        this.queue = new MinHeap<IFlashcard>();
    }

    async initializeQueue(categoryId: string, userId: string): Promise<void> {
        const today = new Date();

        // Log received parameters
        console.log("Received categoryId:", categoryId);
        console.log("Received userId:", userId);

        // Validate categoryId and userId as ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            console.error(`Invalid category ID: ${categoryId}`);
            return;
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error(`Invalid user ID: ${userId}`);
            return;
        }

        // Convert categoryId and userId to ObjectId
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Verify that the category exists for the given userId
        const categoryDoc = await Category.findOne({ _id: categoryObjectId, userId: userObjectId });
        console.log("Category document found:", categoryDoc);  // Add this line for debugging
        if (!categoryDoc) {
            console.error(`Category with ID "${categoryId}" not found for user with ID "${userId}".`);
            return;
        }

        // Use the category's ObjectId and userId to find flashcards due for review
        const dueCards = await flashcard.find({
            dueDate: { $lte: today },
            category: categoryObjectId,  // Use category ObjectId directly
            userId: userObjectId,  // Use user ObjectId directly
        }).exec();

        // Log dueCards for debugging
        console.log("Due flashcards found:", dueCards);

        // Insert each due flashcard into the queue
        dueCards.forEach(card => this.queue.insert(card));
    }

    // Get the next flashcard due for review
    getNextCard(): IFlashcard | null {
        return this.queue.extractMin();
    }

    // Review a flashcard, update its due date and experience based on feedback
    async reviewCard(id: string, feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<void> {
        const card = await flashcard.findById(id);
        const category = await Category.findById(card.category)
        if (card) {
            await card.updateDueDate(feedback);  // Adjusts dueDate and interval based on feedback
            await category.updateExperience(feedback);
            this.queue.update(card);  // Update or reposition the card in the heap
        }
    }
}

export default QueueController;
