import React, {useState} from 'react'
import Answer from './Answer.js';

const Question = ({ props, progress, setProgress, answers, setAnswers }) => {

  const [answerToQuestion, setAnswerToQuestion] = useState({});

  const goToNextQuestion = () => {
    if(answerToQuestion.id){
      let arrayHelper = [...answers];
      arrayHelper.push(answerToQuestion);
      setAnswers(arrayHelper);
      setProgress(progress + 1)
    }
  }

  return (
    <div className="question-container">
      <div className="question"><b>{props.question}</b></div>
      <br />
      { props.answers && props.answers.map((answer, index) => {
        return (
          <Answer key={index} answer={answer} setAnswerToQuestion={setAnswerToQuestion} answerToQuestion={answerToQuestion}/>
        )
      })}
      <br />
      <button disabled={answerToQuestion.id ? false : true} onClick={() => goToNextQuestion()}>Next Question</button>
    </div>
  )
}

export default Question;
