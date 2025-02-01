import React, { useState } from 'react';

// Flash Card App
// functionality
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
  ]);

  return (
    <>
    <Header />
    <div className="container">
      <Quiz questions={questions} />
    </div>
    <Actions />
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
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % questions.length
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-card">
      <div>
        <h2>{currentQuestion.question}</h2>
      </div>
      <ul className="answers">
        {currentQuestion.options.map((option, idx) => (
          <li key={idx}>
            <span>{option}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>
        Next Question
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

function Actions() {
  return (
    <div className="actions">
      <button>Skip</button>
      <button>Reset</button>
      <button>Next Question</button>
    </div>
  );
}
