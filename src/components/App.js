import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

const API_URL = "http://localhost:4000/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  // view can be "list" or "form"
  const [view, setView] = useState("list");

  useEffect(() => {
    const abortController = new AbortController();

    fetch(API_URL, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching questions:", error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // Add a new question and then switch to the list view.
  function handleAddQuestion(newQuestion) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setView("list");
      });
  }

  function handleDeleteQuestion(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setQuestions(questions.filter((q) => q.id !== id)))
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleUpdateQuestion(id, correctIndex) {
    // Optimistically update the state so the UI reflects the change immediately.
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, correctIndex } : q
      )
    );
  
    // Send the PATCH request.
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    }).catch((error) => console.error("Error updating question:", error));
  }
  
  return (
    <div>
      <h1>Quiz Admin Panel</h1>
      <div>
        <button onClick={() => setView("list")}>View Questions</button>
        <button onClick={() => setView("form")}>New Question</button>
      </div>
      {view === "form" && <QuestionForm onAddQuestion={handleAddQuestion} />}
      {view === "list" && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
}

export default App;
