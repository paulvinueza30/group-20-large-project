import flashcard from '../models/flashcardModel';  // Mongoose model
import Category from "../models/categoryModel";
import { IFlashcard } from '../interfaces/IFlashcard';  // TypeScript interface for typing
import { MinHeap } from "./minHeap";  // MinHeap utility from services

class QueueController {
    private queue: MinHeap<IFlashcard>;

    constructor() {
        this.queue = new MinHeap<IFlashcard>();
    }

    async initializeQueue(category: string, userId: string): Promise<void> {
        const today = new Date();
        const normalizedCategory = category.toLowerCase();

        // Find the category document by name and userId
        const categoryDoc = await Category.findOne({ name: normalizedCategory, userId });
        if (!categoryDoc) {
            console.error(`Category "${category}" not found for user.`);
            return;
        }

        // Use the category's ObjectId and userId to find flashcards due for review
        const dueCards = await flashcard.find({
            dueDate: { $lte: today },
            category: categoryDoc._id,  // Filter by category ObjectId
            userId,  // Filter by userId
        }).exec();

        dueCards.forEach(card => this.queue.insert(card));
    }

    // Get the next flashcard due for review
    getNextCard(): IFlashcard | null {
        return this.queue.extractMin();
    }

    // Review a flashcard, update its due date based on feedback
    async reviewCard(id: string, feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<void> {
        const card = await flashcard.findById(id);
        if (card) {
            await card.updateDueDate(feedback);  // Adjusts dueDate and interval based on feedback
            this.queue.update(card);  // Update or reposition the card in the heap
        }
    }
}

export default QueueController;
