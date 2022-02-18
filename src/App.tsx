import React, { createContext, useState } from "react";
import "./App.css";
import QuestionBox from "./components/QuestionBox";
import {fetchQuizData, Question, UserInputtype } from "./Api";
import UserInput from "./components/UserInput";

type InpContextType = {
  userInput:  UserInputtype
  setuserInput:React.Dispatch<React.SetStateAction<UserInputtype>>
}

export const InpContext = createContext<InpContextType | null>(null)

type QuestionAnswer = Question & { answers: string[] };
type Answers = {
  question: string;
  answer: string;
  correct: boolean;
  correct_ans: string;
};

function App() {
  const [userInput, setuserInput] = useState<UserInputtype>({
    totalQues : 10,
    difficulty: '',
    category:0
  })
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
    
    const newQuestions = await fetchQuizData({...userInput});
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
    if (userInput.totalQues !== undefined && num === userInput.totalQues - 1) {
      setquestions([])
      setbtnShow(true)
    } else {
      setnum(num + 1);
    }
  }

  return (
    <InpContext.Provider value={{userInput,setuserInput}}>
    <div className="App-header">
      <div className="container text-center py-5">
        <h1 className="display-4 mb-4">Quiz App</h1>
        
        {
         (questions.length === 0) && userAnswers.length === userInput.totalQues && userAnswers.length !== 0 &&
          <div className="fs-2 mt-5 py-5">
            <p>Final Score : {score}/{userInput.totalQues}</p>
          </div>
        }
            {loading && <p>Loading Questions...</p>}
        {btnShow ? (
          <>
          <UserInput></UserInput>
          <button onClick={startTrivia} className="start-btn my-5">
            { userAnswers.length !== 0 ? 'Restart' : 'Start' }
          </button></>
        ) : null}
        {(questions.length !== 0) && (
          <>
          <QuestionBox
            question={questions[num].question}
            answers={questions[num].answers}
            quesNum={num + 1}
            totalQuestions={userInput.totalQues}
            userAns={userAnswers? userAnswers[num] : null}
            callback={answerHandler}
            ></QuestionBox>
            </>
        )}
        {
         (questions.length !== 0) && userAnswers.length === num+1 &&
          <button onClick={nextQuestion} className="btn btn-lg btn-outline-light mt-5">
            {userAnswers.length !== userInput.totalQues ? 'Next Question' : 'Get Score'}
            </button>
        }
      </div>
    </div>
    </InpContext.Provider>
  );
}

export default App;
