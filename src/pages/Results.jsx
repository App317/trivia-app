import { useNavigate } from 'react-router-dom';
import useTriviaStore from '../store/useTriviaStore';

const Results = () => {
  const navigate = useNavigate();
  const { correctAnswers, incorrectAnswers, selectedCategory, fetchQuestions } =
    useTriviaStore();

  const handleRetry = async () => {
    if (selectedCategory) {
      await fetchQuestions(selectedCategory.id, 'easy');
      navigate('/quiz');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <button onClick={handleRetry}>Retry</button>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
};

export default Results;
