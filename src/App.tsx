import React, { useState } from "react";
import "./App.css";
import QuestionBox from "./components/QuestionBox";
import { Difficulty, fetchQuizData, Question } from "./Api";

type QuestionAnswer = Question & { answers: string[] };
type Answers = {
  question: string;
  answer: string;
  correct: boolean;
  correct_ans: string;
};

const TOTAL_QUES = 10;

function App() {
  const [questions, setquestions] = useState<QuestionAnswer[]>([]);
  const [userAnswers, setuserAnswers] = useState<Answers[]>([]);
  const [loading, setloading] = useState(false);
  const [score, setscore] = useState(0);
  const [num, setnum] = useState(0);
  const [btnShow, setbtnShow] = useState(true)


  const startTrivia = async () => {
    setbtnShow(false)
    setloading(true);
    setscore(0);
    setuserAnswers([]);
    
    const newQuestions = await fetchQuizData(TOTAL_QUES, Difficulty.EASY);
    setquestions(newQuestions);
    setnum(0);
    setloading(false);
  };

  const answerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[num].correct_answer === answer;
    if (correct) {
      setscore(score + 1);
    }
    const currentAnswer = {
      question: questions[num].question,
      answer,
      correct,
      correct_ans: questions[num].correct_answer,
    };
    setuserAnswers([...userAnswers, currentAnswer]);
  };
  
  const nextQuestion = ()=>{
    if (num === TOTAL_QUES - 1) {
      setquestions([])
      setbtnShow(true)
    } else {
      setnum(num + 1);
    }
  }

  return (
    <div className="App-header">
      <div className="container text-center py-5">
        <h1 className="display-4 mb-5">Quiz App</h1>
        {
         (questions.length == 0) && userAnswers.length === TOTAL_QUES &&
          <div className="fs-2 mt-5 py-5">
            <p>Final Score : {score}/{TOTAL_QUES}</p>
          </div>
        }
            {loading && <p>Loading Questions...</p>}
        {btnShow ? (
          <button onClick={startTrivia} className="start-btn my-5">
            { userAnswers.length === TOTAL_QUES ? 'Restart' : 'Start' }
          </button>
        ) : null}
        {(questions.length !== 0) && (
          <>
          <QuestionBox
            question={questions[num].question}
            answers={questions[num].answers}
            quesNum={num + 1}
            totalQuestions={10}
            userAns={userAnswers? userAnswers[num] : null}
            callback={answerHandler}
            ></QuestionBox>
            </>
        )}
        {
         (questions.length !== 0) && userAnswers.length == num+1 &&
          <button onClick={nextQuestion} className="btn btn-lg btn-outline-light mt-5">
            {userAnswers.length !== TOTAL_QUES ? 'Next Question' : 'Get Score'}
            </button>
        }
       
      </div>
    </div>
  );
}

export default App;
