import React from "react";
//@ts-ignore
import styled from "styled-components";

type BtnProps = {
  correct: boolean;
  clicked: boolean;
};

const BtnDiv = styled.div`
  button {
    border: 1px solid silver;
    background: ${({ correct, clicked }: BtnProps) =>
      correct ? "#69da6999" : clicked ? "#ff595999" : "#f5f5dc99"};
  }
`;

type Props = {
  question: string;
  answers: string[];
  quesNum: number;
  totalQuestions: number;
  userAns: any;
  callback: any;
};

function QuestionBox({
  question,
  answers,
  quesNum,
  totalQuestions,
  userAns,
  callback,
}: Props) {
  return (
    <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto quesBox">
      <h6 className="pb-2">
        Question : {quesNum} / {totalQuestions}
      </h6>
      <div>
        <h5 dangerouslySetInnerHTML={{ __html: question }}></h5>
        <div>
          {answers.map((answer, index) => {
            return (
              <BtnDiv
                correct={userAns?.correct_ans === answer}
                clicked={userAns?.answer === answer}
                key={index}
              >
                <button
                  className="btn my-2 w-100"
                  value={answer}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={callback}
                ></button>
              </BtnDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionBox;
