import React, { useState } from 'react';

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

function App() {

  // quiz questions and answers
  const [questions] = useState([
    {
      question: 'What is the supreme law of the land?',
      options: [
        'The Constitution',
        'The Declaration of Independence',
        'The Articles of Confederation',
        'The Bill of Rights',
      ],
      answer: 'The Constitution',
      points: 1,
    },
    {
      question: 'What does the Constitution do?',
      options: [
        'Sets up the government',
        'Defines the government',
        'Protects basic rights of Americans',
        'All of the above',
      ],
      answer: 'All of the above',
      points: 1,
    },
    {
      question:
        'How many amendments does the Constitution have?',
      options: ['10', '27', '33', '50'],
      answer: '27',
      points: 1,
    },
    {
      question:
        'What are the first ten amendments to the Constitution called?',
      options: [
        'The Preamble',
        'The Bill of Rights',
        'The Articles of Confederation',
        'The Federalist Papers',
      ],
      answer: 'The Bill of Rights',
      points: 1,
    },
    {
      question:
        'Who is known as the "Father of the Constitution"?',
      options: [
        'George Washington',
        'Thomas Jefferson',
        'James Madison',
        'Alexander Hamilton',
      ],
      answer: 'James Madison',
      points: 1,
    },
    {
      question:
        'What is the economic system in the United States?',
      options: [
        'Communism',
        'Socialism',
        'Capitalism',
        'Feudalism',
      ],
      answer: 'Capitalism',
      points: 1,
    },
    {
      question:
        'What is the highest court in the United States?',
      options: [
        'The Supreme Court',
        'The Court of Appeals',
        'The District Court',
        'The Circuit Court',
      ],
      answer: 'The Supreme Court',
      points: 1,
    },
    {
      question:
        'Who was the first President of the United States?',
      options: [
        'John Adams',
        'Thomas Jefferson',
        'Abraham Lincoln',
        'George Washington',
      ],
      answer: 'George Washington',
      points: 1,
    },
    {
      question:
        'What movement tried to end racial discrimination?',
      options: [
        'The Civil Rights Movement',
        "The Women's Suffrage Movement",
        'The Labor Movement',
        'The Environmental Movement',
      ],
      answer: 'The Civil Rights Movement',
      points: 1,
    },
    {
      question:
        'What did the Emancipation Proclamation do?',
      options: [
        'Freed the slaves',
        'Ended the Civil War',
        'Gave women the right to vote',
        'Established the Constitution',
      ],
      answer: 'Freed the slaves',
      points: 1,
    },
  ]);

  return (
    <>
    <Header />
    <div className="container">
      <Quiz questions={questions} />
    </div>
    </>
  );
}

export default App

function Header() {
  return (
    <div className="header">
      <p>Quiz Time 🧐</p>
      <p>Score: 0</p>
      <p>Welcome, Chris</p>
    </div>
  );
}


function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const numberOfQuestions = questions.length;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % questions.length
    );
    setSelectedOption(null); // Reset selected option for the next question
    setIsCorrect(null); // Reset the correctness state for the next question
    setShowCorrectAnswer(false); // Hide the correct answer for the next question
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.answer;
    setIsCorrect(isAnswerCorrect);
    setShowCorrectAnswer(!isAnswerCorrect); // Show the correct answer only if the answer is incorrect
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
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
  currentQuestionIndex,
  numberOfQuestions,
}) {
  return (
    <div className="actions">
      <button onClick={checkAnswer}>🧐 Check Answer</button>

      <button className="" onClick={onReset}>
        Reset
      </button>

      <div>
        Question {currentQuestionIndex + 1} of{' '}
        {numberOfQuestions}
      </div>

      <button onClick={handleNextQuestion}>
        ➡️ Next Question
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