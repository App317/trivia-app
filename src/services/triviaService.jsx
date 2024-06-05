import axios from 'axios';

export const getQuestions = async (category, token) => {
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple&token=${token}`
  );
  return response.data.results;
};

export const getCategories = async () => {
  const response = await axios.get('https://opentdb.com/api_category.php');
  return response.data.trivia_categories;
};

export const getSessionToken = async () => {
  const response = await axios.get(
    'https://opentdb.com/api_token.php?command=request'
  );
  console.log('Response: ', response);
  return response.data.token;
};
