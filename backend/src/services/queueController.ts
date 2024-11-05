import flashCard from '../models/flashCardModel';  // Mongoose model
import Category from "../models/categoryModel"; 
import { IFlashCard } from '../interfaces/IFlashCard';  // TypeScript interface for typing
import { MinHeap } from "./minHeap";  // MinHeap utility from services

class QueueController {
    private queue: MinHeap<IFlashCard>;

    constructor() {
        this.queue = new MinHeap<IFlashCard>();
    }

    async initializeQueue(category: string): Promise<void> {
        const today = new Date();
        const normalizedCategory = category.toLowerCase();

        // Find the category document by name
        const categoryDoc = await Category.findOne({ name: normalizedCategory });
        if (!categoryDoc) {
            console.error(`Category "${category}" not found.`);
            return;
        }

        // Use the category's ObjectId to find flashcards due for review in this category
        const dueCards = await flashCard.find({
            dueDate: { $lte: today },
            category: categoryDoc._id  // Use the ObjectId of the category
        }).exec();

        dueCards.forEach(card => this.queue.insert(card));
    }

    // Get the next flashcard due for review
    getNextCard(): IFlashCard | null {
        return this.queue.extractMin();
    }

    // Review a flashcard, update its due date based on feedback
    async reviewCard(id: string, feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<void> {
        const card = await flashCard.findById(id);
        if (card) {
            await card.updateDueDate(feedback);  // Adjusts dueDate and interval based on feedback
            this.queue.update(card);  // Update or reposition the card in the heap
        }
    }
}

export default QueueController;
