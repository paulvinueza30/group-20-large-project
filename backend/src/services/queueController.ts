import flashCard from '../models/flashCardModel';  // Mongoose model
import { IFlashCard } from '../interfaces/IFlashCard';  // TypeScript interface for typing
import { MinHeap } from "./minHeap";  // MinHeap utility from services

class QueueController {
    private queue: MinHeap<IFlashCard>;

    constructor() {
        this.queue = new MinHeap<IFlashCard>();
    }

    // Initialize the queue with flashcards due for review
    async initializeQueue(): Promise<void> {
        const today = new Date();
        const dueCards = await flashCard.find({ dueDate: { $lte: today } }).exec();
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
