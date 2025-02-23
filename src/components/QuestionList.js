import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <p>{q.prompt}</p>
            <label>Correct Answer:</label>
            <select
              value={q.correctIndex}
              onChange={(e) =>
                onUpdateQuestion(q.id, parseInt(e.target.value))
              }
            >
              {q.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => onDeleteQuestion(q.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
