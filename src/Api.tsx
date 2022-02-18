export type UserInputtype = {
  totalQues: number
  difficulty: string 
  category: number
}

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};


export const fetchQuizData = async ({totalQues,difficulty,category}:UserInputtype) => {
  const url = `https://opentdb.com/api.php?amount=${totalQues}&category=${category}&difficuly=${difficulty}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data)
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
