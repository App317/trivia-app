import { useNavigate } from 'react-router-dom';
import useTriviaStore from '../store/useTriviaStore';

const Results = () => {
  const navigate = useNavigate();
  const {
    correctAnswers,
    incorrectAnswers,
    selectedCategory,
    fetchQuestions,
    loading,
  } = useTriviaStore();

  const handleContinue = async () => {
    if (selectedCategory) {
      await fetchQuestions(selectedCategory.id);
      navigate('/quiz');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading New Questions...</div>;
  }
  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <button onClick={handleContinue}>Continue Category</button>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
};

export default Results;
