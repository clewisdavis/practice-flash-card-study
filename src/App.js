import React, { useState } from 'react';
import questions from './questions';

// Flash Card App
// Show a question
// Show answer options, multiple choice
// Show a hint
// Check answer
// For correct answer, show a green checkmark and add 1 to score
// For wrong answer, show a red X and subtract 1 from score
// Skip a question
// Display score
// Reset quiz
// Design is friendly and intuitive for kids
// Display the number of questions, 1 of 10, and update as user goes through the quiz
// Sumbmit the quiz and display a summary of the quiz, correct and incorrect, and total points

function App() {

  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] =
    useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleQuizSubmit = () => {
    // Check all answers
    questions.forEach((question, index) => {
      const isAnswerCorrect =
        userAnswers[index] === question.answer;
      if (isAnswerCorrect) {
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      } else {
        setIncorrectAnswers(
          (prevIncorrect) => prevIncorrect + 1
        );
      }
    });
    setQuizSubmitted(true);
  };

  const handleReset = () => {
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizSubmitted(false);
  };

  return (
    <>
      <Header score={score} />
      <div className="container">
        <Quiz
          questions={questions}
          setScore={setScore}
          setCorrectAnswers={setCorrectAnswers}
          setIncorrectAnswers={setIncorrectAnswers}
          handleQuizSubmit={handleQuizSubmit}
        />
        <Summary
          score={score}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          handleReset={handleReset}
        />
      </div>
    </>
  );
}

export default App

function Header({ score }) {
  return (
    <div className="header">
      <p>Quiz Time 🧐</p>
      <p>Score: {score}</p>
      <p>Welcome, Chris</p>
    </div>
  );
}


function Quiz({
  questions,
  setScore,
  setCorrectAnswers,
  setIncorrectAnswers,
  handleQuizSubmit,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);
  const [selectedOption, setSelectedOption] =
    useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] =
    useState(false);

  const numberOfQuestions = questions.length;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % questions.length
    );
    setSelectedOption(null); // Reset selected option for the next question
    setIsCorrect(null); // Reset the correctness state for the next question
    setShowCorrectAnswer(false); // Hide the correct answer for the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) =>
        (prevIndex - 1 + questions.length) %
        questions.length
    );
    setSelectedOption(null); // Reset selected option for the previous question
    setIsCorrect(null); // Reset the correctness state for the previous question
    setShowCorrectAnswer(false); // Hide the correct answer for the previous question
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect =
      selectedOption === currentQuestion.answer;
    setIsCorrect(isAnswerCorrect);
    setShowCorrectAnswer(!isAnswerCorrect); // Show the correct answer only if the answer is incorrect

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
      setIncorrectAnswers(
        (prevIncorrect) => prevIncorrect + 1
      );
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setScore(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-card">
        <div>
          <h2>{currentQuestion.question}</h2>
        </div>
        <ul className="answers">
          {currentQuestion.options.map((option, idx) => (
            <li key={idx}>
              <label>
                <span>
                  <input
                    type="checkbox"
                    checked={selectedOption === option}
                    onChange={() =>
                      handleOptionChange(option)
                    }
                  />
                  <span> {option}</span>
                </span>
                {selectedOption === option &&
                  isCorrect !== null && (
                    <p>
                      {isCorrect
                        ? '✅ Correct!'
                        : '❌ Incorrect!'}
                    </p>
                  )}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <Actions
        onReset={handleReset}
        checkAnswer={checkAnswer}
        handleNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        handleQuizSubmit={handleQuizSubmit}
        currentQuestionIndex={currentQuestionIndex}
        numberOfQuestions={numberOfQuestions}
      />
    </>
  );
}


function Actions({
  onReset,
  checkAnswer,
  handleNextQuestion,
  handlePreviousQuestion,
  currentQuestionIndex,
  numberOfQuestions,
  handleQuizSubmit,
}) {
  return (
    <div className="actions">
      <button onClick={checkAnswer}>🧐 Check Answer</button>

      <button className="" onClick={onReset}>
        Reset
      </button>

      <div>
        <button onClick={handlePreviousQuestion}>
          ⬅️ Previous Question
        </button>
      </div>

      <div>
        Question {currentQuestionIndex + 1} of{' '}
        {numberOfQuestions}
      </div>

      <button onClick={handleNextQuestion}>
        ➡️ Next Question
      </button>

      <button onClick={handleQuizSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}

function Hint() {
  return (
      <div>
        <button>Hint 🧐</button>
        <p>
          The government does a lot of things for the people
          of the United States.
        </p>
      </div>
  );
}

// Design a summary component
function Summary({
  score,
  correctAnswers,
  incorrectAnswers,
  handleReset,
}) {
  return (
    <div>
      <p>Summary</p>
      <p>Total Score: {score}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <button onClick={handleReset}>Restart Quiz</button>
    </div>
  );
}