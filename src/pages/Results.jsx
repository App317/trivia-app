import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useTriviaStore from '../store/useTriviaStore';
import styles from '../styles/results.module.css';

const Results = () => {
  const navigate = useNavigate();
  const { correctAnswers, incorrectAnswers, selectedCategory } =
    useTriviaStore();

  const handleContinue = async () => {
    if (selectedCategory) {
      navigate('/quiz');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!selectedCategory) {
      navigate('/');
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Results</h1>
      <div className={styles.totalAnswers}>
        <p className={styles.correctAnswers}>
          Total Correct Answers: {correctAnswers}
        </p>
        |
        <p className={styles.incorrectAnswers}>
          Total Incorrect Answers: {incorrectAnswers}
        </p>
      </div>
      <button className={styles.button} onClick={handleContinue}>
        Continue Category
      </button>
      <button className={styles.button} onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
};

export default Results;
