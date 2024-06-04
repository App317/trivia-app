import { create } from 'zustand';
import {
  getCategories,
  getQuestions,
  getSessionToken,
} from '../services/triviaService';
import { delay } from '../utils/delay';
import { shuffleArray } from '../utils/shuffleArray';

const useTriviaStore = create((set, get) => ({
  categories: [],
  selectedCategory: null,
  questions: [],
  currentQuestionIndex: 0,
  shuffledAnswers: [],
  correctAnswers: 0,
  incorrectAnswers: 0,
  timer: 30,
  intervalId: null,
  sessionToken: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      console.log('Fetching categories...');
      const categories = await getCategories();
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories: ', error);
    }
  },

  fetchSessionToken: async () => {
    try {
      const token = await getSessionToken();
      console.log('Session token fetched: ', token);
      set({ sessionToken: token });
    } catch (error) {
      console.error('Failed to fetch session token: ', error);
      return null;
    }
  },

  fetchQuestions: async (category, difficulty) => {
    set({ loading: true, error: null });
    const token = get().sessionToken;

    if (!token) {
      set({ loading: false, error: 'Failed to fetch session token' });
      return;
    }
    try {
      console.log('Fetching questions with token: ', token);
      await delay(5000); //To adhere to the rate limiter
      const questions = await getQuestions(category, difficulty, token);
      console.log('Questions fetched:', questions);
      set({ questions, currentQuestionIndex: 0, loading: false });
      get().shuffleAnswers();
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      set({ loading: false, error: 'Failed to fetch questions' });
    }
  },

  shuffleAnswers: () => {
    const currentQuestionIndex = get().currentQuestionIndex;
    const questions = get().questions;
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      set({ shuffledAnswers: shuffleArray(answers) });
    }
  },

  selectCategory: async (category) => {
    set({ selectedCategory: category });
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
    get().shuffleAnswers();
  },

  checkAnswer: (selectedAnswer) => {
    const currentQuestionIndex = get().currentQuestionIndex;
    const questions = get().questions;
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
      set((state) => ({ correctAnswers: state.correctAnswers + 1 }));
    } else {
      set((state) => ({ incorrectAnswers: state.incorrectAnswers + 1 }));
    }
  },

  runTimer: () => {},
}));

export default useTriviaStore;
