// src/interfaces/ICategory.ts

export interface ICategory {
  _id: string; // Unique identifier for the category
  userId: string;
  name: string; // Name of the category
  cardCount: number;
  streakCount?: number;
  experience?: number;
  cardsStudied?: number;
  streakLastUpdated?: Date;
  createdAt?: Date;
  editedAt?: Date;

}
