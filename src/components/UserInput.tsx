import React, { useContext } from "react";
import { InpContext } from "../App";

const Difficulty = ["Easy", "Medium", "Hard"];
const Categories = [
  { id: 9, tag: "General Knowledge" },
  { id: 17, tag: "Science & Nature" },
  { id: 20, tag: "Mythology" },
  { id: 21, tag: "Sports" },
  { id: 22, tag: "Geography" },
  { id: 23, tag: "History" },
  { id: 24, tag: "Politics" },
  { id: 11, tag: "Entertainment: Film" },
  { id: 25, tag: "Art" },
  { id: 26, tag: "Celebrities" },
  { id: 27, tag: "Animals" },
];

function UserInput() {
  const userInpContext = useContext(InpContext);

  const selectHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.currentTarget.id === "difficulty") {
      userInpContext?.setuserInput({
        totalQues: userInpContext.userInput?.totalQues,
        difficulty: e.currentTarget.value,
        category: userInpContext.userInput?.category,
      });
    } else if (e.currentTarget.id === "question") {
      userInpContext?.setuserInput({
        totalQues: Number(e.currentTarget.value),
        difficulty: userInpContext.userInput?.difficulty,
        category: userInpContext.userInput?.category,
      });
    } else if (e.currentTarget.id === "category") {
      userInpContext?.setuserInput({
        totalQues: userInpContext.userInput?.totalQues,
        difficulty: userInpContext.userInput?.difficulty,
        category: Number(e.currentTarget.value),
      });
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto fs-6">
        <label className="mb-2">Number of Questions:</label>
         <input
        id="question"
        type="number"
        className="form-control"
        min={1}
        value={userInpContext?.userInput.totalQues}
        onChange={selectHandler}
      ></input>
      <br></br>
      <label className="mb-2">Select Category:</label>
      <select className="form-control" id="category" onChange={selectHandler}>
        <option value="">Any Category</option>
        {Categories.map((category, index) => {
          return (
            <option key={index} value={category.id}>
              {category.tag}
            </option>
          );
        })}
      </select>
      <br></br>
      <label className="mb-2">Select Difficulty:</label>
      <select className="form-control" id="difficulty" onChange={selectHandler}>
        <option value="">Any Difficulty</option>
        {Difficulty.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default UserInput;
