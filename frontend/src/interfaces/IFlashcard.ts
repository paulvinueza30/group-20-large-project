// frontend/src/interfaces/IFlashcard.ts
export interface IFlashcard {
    _id: string;
    userId: string;
    frontSide: string;
    backSide: string;
    category: string;
    createdAt?: Date;
    editedAt?: Date;
    dueDate: Date;
    interval?: number;
  }
  