import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };
    onAddQuestion(newQuestion);
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  function handleAnswerChange(index, value) {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label htmlFor="prompt">Prompt:</label>
      <input
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div>
        <label>Answers:</label>
        {answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
            <input
              id={`answer-${index}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <label htmlFor="correctAnswer">Correct Answer:</label>
      <select
        id="correctAnswer"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
      >
        {answers.map((_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
