import React, { useState } from "react";
import questions from "../questions";
import Result from "./Result";
// import "../styles/QuestionBox.css";
import lightSun from "../assets/mode.png";

const QuestionBox = () => {
  
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion ] = useState(0) 
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showResult] = useState(false);

 
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
 
  function calculateScore() {
  
  }


  return (
    <div className={`main ${darkMode ? "dark" : "light"}`}>
      <div className="top">
        
        <h1 >
          React Quiz
        </h1>
        
        <button onClick={toggleTheme} className="theme-btn">
          { <img src={lightSun} />  }
        </button>
      </div>
      <div className="container">
        {!showResult ? (
          
          <div>
            <div className="question-number">Question: {currentQuestion + 1} of {questions.length}</div>
            <div  className="question">
             
              {questions[currentQuestion].text}
            </div>
           
            
            <div className="button-container">
              <button
                className={`highlight-button`}
                onClick={() => setIsHighlighted(true)}
              >
                Highlight
              </button>
              <button
                className={`remove-highlight-button`}
                onClick={() => setIsHighlighted(false)}
              >
                Remove Highlight
              </button>
            </div>
          </div>
        ) : (
         
          <Result score={calculateScore()}  />
        )}
      </div>
    </div>
  );
};


export default QuestionBox;
