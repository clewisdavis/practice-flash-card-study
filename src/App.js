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
  const questions = [
    {
      question: 'What is the supreme law of the land?',
      options: [
        'The Constitution',
        'The Declaration of Independence',
        'The Articles of Confederation',
        'The Bill of Rights',
      ],
      answer: 'The Constitution',
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
    },
  ];

  return (
    <div className="container">
      <h1>Hello, Welcome to Quiz Time 🧐</h1>
      <Quiz />
    </div>
  );
}

export default App; 


function Quiz() {
  return (
    <div className="quiz-card">
      <div>
        <h2>What is the supreme law of the land?</h2>
      </div>
      <ul className="answers">
        <li>
          <span>The Constitution</span>
          <span>✅</span>
        </li>
        <li>
          <span>The Declaration of Independence</span>
          <span>❌</span>
        </li>
        <li>
          <span>The Articles of Confederation</span>
          <span>❌</span>
        </li>
        <li>
          <span>The Bill of Rights</span>
          <span>❌</span>
        </li>
        <li>
          <span>All of the above</span>
          <span>✅</span>
        </li>
      </ul>

      <div>
        <button>Hint 🧐</button>
        <p>
          The government does a lot of things for the people
          of the United States.
        </p>
      </div>
    </div>
  );
}
