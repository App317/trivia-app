import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTriviaStore from '../store/useTriviaStore';
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
    correctAnswers,
    incorrectAnswers,
    sessionToken,
    loading,
    error,
  } = useTriviaStore();

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const startQuiz = async () => {
      if (category) {
        selectCategory(category);
        if (sessionToken) {
          await fetchQuestions(category.id, 'easy');
        } else {
          console.log('Session token unavailable');
        }
      }
    };
    startQuiz();
  }, [category, selectCategory, fetchQuestions, sessionToken]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    checkAnswer(answer);

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        navigate('/results');
      }
    }, 1000); // Adjust the timeout duration as needed
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  useEffect(() => {
    if (currentQuestionIndex > questions.length && questions.length > 0) {
      navigate('/results');
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  useEffect(() => {
    console.log('Current Question: ', currentQuestion);
    console.log('Current Answers: ', shuffledAnswers);
    console.log('Correct answer: ', correctAnswers);
    console.log('Incorrect answers: ', incorrectAnswers);
  }, [currentQuestion, shuffledAnswers, correctAnswers, incorrectAnswers]);

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
          <h3 className={styles.question}>{currentQuestion.question}</h3>
          <div className={styles.answers}>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                className={styles.answer}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default Quiz;
