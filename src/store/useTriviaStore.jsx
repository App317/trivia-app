import { create } from 'zustand';
import { getCategories, getQuestions } from '../services/triviaService';

const useTriviaStore = create((set) => ({
  categories: [],
  questions: [],
  selectedCategory: null,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  fetchQuestions: async (category, difficulty) => {
    const questions = await getQuestions(category, difficulty);
    set({ questions });
  },
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },
}));

export default useTriviaStore;
