export interface Question {
  id: number;
  category: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
}

export type UserAnswer = string | null;
