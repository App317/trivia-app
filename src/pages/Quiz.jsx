import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTriviaStore from '../store/useTriviaStore';
import { delay } from '../utils/delay';
import he from 'he';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';
import styles from '../styles/quiz.module.css';

const Quiz = () => {
  const navigate = useNavigate();

  const {
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
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const startQuiz = async () => {
      if (!selectedCategory) {
        navigate('/');
        return;
      }

      if (!sessionToken) {
        console.log('Session token unavailable. Retrieving new session token');
        await fetchSessionToken();
      }

      await fetchQuestions(selectedCategory.id);
    };

    startQuiz();
  }, [
    selectedCategory,
    fetchQuestions,
    fetchSessionToken,
    sessionToken,
    navigate,
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = async (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setButtonsDisabled(true);
    setCorrectAnswer(currentQuestion.correct_answer);

    checkAnswer(answer);

    await delay(2000);

    setFeedback(null);
    setButtonsDisabled(false);
    setCorrectAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      navigate('/results');
    }
  };

  if (error) {
    return (
      <div className={styles.container}>
        Error: {error} <br /> Please refresh the page
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          Loading <br /> questions...
        </div>
        <div className={styles.loading}>
          <LineSpinner size="50" stroke="3" speed="1" color="pink" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${feedback ? styles[feedback] : ''}`}>
      <div className={styles.questionIndex}>
        {' '}
        {currentQuestionIndex + 1 + '/' + questions.length}
      </div>
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
                className={`${styles.answer} ${
                  correctAnswer === answer ? styles.correctAnswer : ''
                }`}
                onClick={() => handleAnswerClick(answer)}
                disabled={buttonsDisabled}
              >
                {he.decode(answer)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
