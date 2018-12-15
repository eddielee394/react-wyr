import React from "react";
import { QuestionContainer } from "components/Questions";

const QuestionList = props => {
  const { questionIds } = props;
  const listQuestions = questionIds.map(id => (
    <QuestionContainer key={id} id={id} />
  ));
  return <div>{listQuestions}</div>;
};

export default QuestionList;
