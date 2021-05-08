import React from 'react'

const Answer = ({ answer, setAnswerToQuestion, answerToQuestion }) => {

  return (
    <div className="answer">
      <label>
        <input type="radio" onChange={() => setAnswerToQuestion(answer)} checked={answerToQuestion.id === answer.id ? true : false}/>
        <span>{ answer.text}</span>
      </label>
    </div>
  )
}

export default Answer;
