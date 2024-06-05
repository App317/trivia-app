import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTriviaStore from '../store/useTriviaStore';
import he from 'he';
import styles from '../styles/quiz.module.css';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  const {
    selectCategory,
    selectedCategory,
    questions,
    fetchQuestions,
    currentQuestionIndex,
    nextQuestion,
    shuffledAnswers,
    checkAnswer,
    sessionToken,
    fetchSessionToken,
    loading,
    error,
  } = useTriviaStore();

  const [feedback, setFeedback] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    const startQuiz = async () => {
      if (!category) {
        navigate('/'); // Redirect to home if category is missing
        return;
      }
      selectCategory(category);
      if (sessionToken) {
        await fetchQuestions(category.id);
      } else {
        console.log('Session token unavailable. Retrieving new session token');
        await fetchSessionToken();
      }
    };
    startQuiz();
  }, [
    category,
    selectCategory,
    fetchQuestions,
    fetchSessionToken,
    sessionToken,
    navigate, // Ensure navigate is included in dependencies
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setButtonsDisabled(true);

    checkAnswer(answer);

    setTimeout(() => {
      setFeedback(null);
      setButtonsDisabled(false);
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        navigate('/results');
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  useEffect(() => {
    if (currentQuestionIndex > questions.length && questions.length > 0) {
      navigate('/results');
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  if (loading) {
    return <div>Loading Questions...</div>;
  }

  if (error) {
    return <div>Cannot display questions! Error: {error}</div>;
  }

  return (
    <div className={`${styles.container} ${feedback ? styles[feedback] : ''}`}>
      <h1 className={styles.title}>
        Quiz {selectedCategory ? `- ${selectedCategory.name}` : ''}
      </h1>
      {currentQuestion && (
        <div>
          <h3 className={styles.question}>
            {he.decode(currentQuestion.question)}
          </h3>
          <div className={styles.answers}>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                className={styles.answer}
                onClick={() => handleAnswerClick(answer)}
                disabled={buttonsDisabled}
              >
                {he.decode(answer)}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={handleNextQuestion} disabled={buttonsDisabled}>
        Next Question
      </button>
    </div>
  );
};

export default Quiz;
