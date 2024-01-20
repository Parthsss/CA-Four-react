import React from 'react';

const Result = ({ score, correctCount, totalQuestions, resetQuiz }) => {
  return (
    <div className="result-container">
      <h2 className='result-heading'>Result</h2>
      <p className='result'>Your Score: {score}%</p>
      <p className='result'>Correct Answers: {correctCount} out of {totalQuestions}</p>
      <div className='progress-bar'>
        <div className='percentage-bar' style={{ width: `${score}%` }}>
        </div>
      </div>
      <button onClick={resetQuiz} className='reset-button'>Restart Quiz</button>
    </div>
  );
};

export default Result;






