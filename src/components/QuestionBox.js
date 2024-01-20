import React, { useState } from "react";
import questions from "../questions";
import Result from "./Result";
import "../components/style.css";
import moonImage from "../assets/dark-mode.png";
import lightSun from "../assets/mode.png";
import logoImage from "../assets/quiz.png";

const QuestionBox = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleOptionSelect = (optionId) => {
    if (selectedOptions[currentQuestion] === null) {
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[currentQuestion] = optionId;
      setSelectedOptions(updatedSelectedOptions);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setShowResult(false);
  };

  const getQuestionStyle = () => {
    return isHighlighted
      ? {
          color: "red",
          fontWeight: "700",
        }
      : {};
  };

  function calculateScore() {
    const correctCount = selectedOptions.reduce(
      (count, selectedOption, index) => {
        const question = questions[index];
        return (
          count +
          (selectedOption !== null && isOptionCorrect(question, selectedOption)
            ? 1
            : 0)
        );
      },
      0
    );
     return Math.round((correctCount / questions.length) * 100);
  }

  function isOptionCorrect(question, selectedOption) {
    return (
      question.options.find((option) => option.id === selectedOption)
        ?.isCorrect || false
    );
  }

  return (
    <div className={`quiz-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="quiz-header">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <h1 className="quiz-title">Silicon Trivia</h1>
        <button onClick={toggleTheme} className="theme-button">
          {darkMode ? (
            <img
              src={lightSun}
              style={{ width: "60px", height: "60px" }}
              alt="light-mode"
            />
          ) : (
            <img
              src={moonImage}
              style={{ width: "60px", height: "60px" }}
              alt="dark-mode"
            />
          )}
        </button>
      </div>
      <div className="quiz-main-container">
        {!showResult ? (
          <div>
            <div className="quiz-question-number">
              Question: {currentQuestion + 1} of {questions.length}
            </div>
            <div style={getQuestionStyle()} className="quiz-question-text">
              {questions[currentQuestion].text}
            </div>
            <ul className="quiz-options-list">
              {questions[currentQuestion].options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`quiz-option ${
                    selectedOptions[currentQuestion] === option.id
                      ? "selected"
                      : ""
                  } option-${option.id}`}
                >
                  {option.text}
                </li>
              ))}
            </ul>
            <div className="quiz-button-container">
              <button
                className={`quiz-button`}
                onClick={() => setIsHighlighted(true)}
              >
                Highlight
              </button>
              <button
                className={`quiz-button`}
                onClick={() => setIsHighlighted(false)}
              >
                Remove Highlight
              </button>
            </div>
          </div>
        ) : (
          <Result
            score={calculateScore()}
            correctCount={
              selectedOptions.filter(
                (option, index) =>
                  option !== null && isOptionCorrect(questions[index], option)
              ).length
            }
            totalQuestions={questions.length}
            resetQuiz={resetQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
