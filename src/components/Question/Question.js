import React from "react";

const Question = props => {
  const {
    question,
    author,
    handleAddVote,
    handleVoteCount,
    handleVotePercent
  } = props;

  return (
    <div>
      <h1>Would you rather?</h1>
      <p>id: {question.id}</p>
      <p>author: {author.name}</p>
      <img src={author.avatarUrl} />
      <p>timestamp: {question.timestamp}</p>
      <p>optionOne: {question.optionOne.text}</p>
      <button onClick={handleAddVote}>Vote</button>
      <p>Votes Count: {handleVoteCount(question.optionOne)}</p>
      <p>Votes Percent: {handleVotePercent(question.optionOne)}</p>
      <p>optionTwo: {question.optionTwo.text}</p>
      <p>Votes Count: {handleVoteCount(question.optionTwo)}</p>
      <p>Votes Percent: {handleVotePercent(question.optionTwo)}</p>
    </div>
  );
};

export default Question;
