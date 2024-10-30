import Flashcard, { IFlashcard } from '../models/Flashcard';
import MinHeap from './MinHeap'; // MinHeap implementation not built yet...

class QueueController {
    private queue: MinHeap<IFlashcard>;

    constructor() {
        this.queue = new MinHeap<IFlashcard>();
    }

    async initializeQueue(): Promise<void> {
        const today = new Date();
        const dueCards = await Flashcard.find({ dueDate: { $lte: today } }).exec();
        dueCards.forEach(card => this.queue.insert(card));
    }

    getNextCard(): IFlashcard | null {
        return this.queue.isEmpty() ? null : this.queue.extractMin();
    }

    async reviewCard(cardId: string, feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<void> {
        const card = await Flashcard.findById(cardId);
        if (card) {
            await card.updateDueDate(feedback);
            this.queue.update(card);  // Reinsert with updated due date
        }
    }
}

export default QueueController;
