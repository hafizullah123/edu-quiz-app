import React, { useState, useEffect } from "react";
import Question from "./Question";
import AddQuestion from "./AddQuestion";
import AdminPanel from "./AdminPanel";

const initialQuestions = {
  en: [
    {
      question: "What is the capital of Afghanistan?",
      options: ["Kabul", "Kandahar", "Herat", "Mazar"],
      answer: "Kabul",
      explanation: "Kabul is the capital and largest city of Afghanistan.",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "Basic arithmetic: 2 + 2 = 4.",
    },
  ],
  ps: [
    {
      question: "د افغانستان پلازمېنه کومه ده؟",
      options: ["کابل", "کندهار", "هرات", "مزار"],
      answer: "کابل",
      explanation: "کابل د افغانستان پلازمېنه ده.",
    },
    {
      question: "۲ + ۲ څو کېږي؟",
      options: ["۳", "۴", "۵", "۶"],
      answer: "۴",
      explanation: "۲ جمع ۲ مساوي دی ۴.",
    },
  ],
  fa: [
    {
      question: "پایتخت افغانستان کدام است؟",
      options: ["کابل", "قندهار", "هرات", "مزار"],
      answer: "کابل",
      explanation: "کابل پایتخت افغانستان است.",
    },
    {
      question: "۲ + ۲ چند می‌شود؟",
      options: ["۳", "۴", "۵", "۶"],
      answer: "۴",
      explanation: "۲ به‌علاوه ۲ مساوي است با ۴.",
    },
  ],
};

function App() {
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState(initialQuestions);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(10);

  const allQuestions = questions[language];

  useEffect(() => {
    if (timer === 0) {
      handleAnswer(null);
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (option) => {
    const correct = allQuestions[current].answer;
    const isCorrect = option === correct;
    if (isCorrect) setScore(score + 1);
    setUserAnswers([
      ...userAnswers,
      {
        question: allQuestions[current].question,
        selected: option,
        correct,
        explanation: allQuestions[current].explanation,
      },
    ]);
    const next = current + 1;
    if (next < allQuestions.length) {
      setCurrent(next);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const addQuestion = (newQuestion) => {
    const updatedQuestions = { ...questions };
    updatedQuestions[newQuestion.language] = [
      ...updatedQuestions[newQuestion.language],
      newQuestion,
    ];
    setQuestions(updatedQuestions);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setUserAnswers([]);
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2>
        🌍 Language:
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
            restartQuiz();
          }}
          value={language}
        >
          <option value="en">English</option>
          <option value="ps">پښتو</option>
          <option value="fa">دری</option>
        </select>
      </h2>

      {showScore ? (
        <div>
          <h2>
            Your Score: {score} / {allQuestions.length}
          </h2>
          <button onClick={restartQuiz} style={{ marginBottom: "20px" }}>
            🔁 Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <h3>⏳ Time Left: {timer}s</h3>
          <Question data={allQuestions[current]} onAnswer={handleAnswer} />
        </>
      )}

      <AddQuestion onAdd={addQuestion} />
      <AdminPanel />
    </div>
  );
}

export default App;
