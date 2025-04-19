import React, { useState } from "react";

function AddQuestion({ onAdd }) {
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explanation: "",
    language: "en",
  });

  const handleChange = (e, i) => {
    const options = [...form.options];
    options[i] = e.target.value;
    setForm({ ...form, options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form); // This will call the handler passed from App.js
    setForm({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      explanation: "",
      language: "en",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 500, margin: "auto", padding: 20 }}
    >
      <h3>➕ Add New Question</h3>
      <input
        type="text"
        placeholder="Question"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
        required
      />
      {form.options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleChange(e, i)}
          required
        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={form.answer}
        onChange={(e) => setForm({ ...form, answer: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Explanation"
        value={form.explanation}
        onChange={(e) => setForm({ ...form, explanation: e.target.value })}
      />
      <select
        value={form.language}
        onChange={(e) => setForm({ ...form, language: e.target.value })}
      >
        <option value="en">English</option>
        <option value="ps">Pashto</option>
        <option value="fa">Dari</option>
      </select>
      <br />
      <br />
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default AddQuestion;
