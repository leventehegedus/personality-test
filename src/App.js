import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import Question from './Question.js';

function App() {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [result, setResult] = useState(0);
  const [resultInText, setResultInText] = useState('');

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    let result = answers.map(answer => answer.score).reduce((a, b) => a + b, 0);
    setResult(result);
    calculateResult();
  },[answers.length])

  const getData = () => {
    axios.get('data.json',{
       headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        }
     }).then(function(response){
       setQuestions(response.data);
    }).catch(
      console.log('Something went wrong')
    );
   }

  const calculateResult = () => {
    let minSum = 0;
    let maxSum = 0;

    questions.map(question => {
      let answerScores = question.answers.map(answer => answer.score);
      let minScore = Math.min(...answerScores);
      let maxScore = Math.max(...answerScores);
      minSum += minScore;
      maxSum += maxScore;
    })
    if(result < (minSum + maxSum)/2){
      setResultInText('introvert');
    } else {
      setResultInText('extrovert');
    }
  }

  return (
    <div className="personality-quiz-container">
      { progress < 0 &&
        <>
          <div>
            <b>Welcome!</b>
            <br />
            <span>This is a personlity quiz to decide if you are rather introvert or rather extrovert.</span>
          </div>
          <button onClick={() => setProgress(progress + 1)}>Start quiz</button>
        </>
      }
      { progress > -1 && progress < questions.length && questions.map((question, index) => {
        if(index === progress){
          return (
            <>
            <Question key={index} props={question} setProgress={setProgress} progress={progress} setAnswers={setAnswers} answers={answers}/>
            <br />
            </>
          )
        }
      })}
      { progress === questions.length &&
        <>
        <div>The test is over. Based on the answers, you have <b>{resultInText}</b> personlity.</div>
        <br />
        <button onClick={() => setProgress(-1)}>Restart quiz</button>
        </>
      }
    </div>
  );
}

export default App;
