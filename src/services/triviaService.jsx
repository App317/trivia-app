import axios from 'axios';

const getQuestions = async (category, difficulty) => {
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  return response.data.results;
};

const getCategories = async () => {
  const response = await axios.get('https://opentdb.com/api_category.php');
  return response.data.trivia_categories;
};

export { getQuestions, getCategories };
