import React from "react";
import { connect } from "react-redux";

const Question = props => {
  const { question, author } = props;

  //get Vote counts by option
  const getVoteCount = (option = null) => handleVoteCount(option);

  //get vote percentage by option
  const getVotePercent = (option = null) => handleVotePercent(option);

  //get users count
  const getUserCount = () => {
    const { users } = props;
    return Object.keys(users).length;
  };

  //handle option vote count
  const handleVoteCount = option => option.votes.length;

  //handle option vote percentage
  const handleVotePercent = option => {
    let usersCount = getUserCount();
    let voteCount = getVoteCount(option);
    return calcPercent(voteCount, usersCount);
  };

  //todo: move to a util helper
  const calcPercent = (partialValue, totalValue) => {
    let value = (100 * partialValue) / totalValue;
    value = value.toFixed(0);

    return `${value}%`;
  };

  return (
    <div>
      <h1>Would you rather?</h1>
      <p>id: {question.id}</p>
      <p>author: {author.name}</p>
      <img src={author.avatarUrl} />
      <p>timestamp: {question.timestamp}</p>
      <p>optionOne: {question.optionOne.text}</p>
      <p>Votes Count: {getVoteCount(question.optionOne)}</p>
      <p>Votes Percent: {getVotePercent(question.optionOne)}</p>
      <p>optionTwo: {question.optionTwo.text}</p>
      <p>Votes Count: {getVoteCount(question.optionTwo)}</p>
      <p>Votes Percent: {getVotePercent(question.optionTwo)}</p>
    </div>
  );
};

/**
 * Map state to props from store
 * @param users
 * @param questions
 * @param id
 * @return {{question: *, author: {avatarUrl: *, name: null}}}
 */
function mapStateToProps({ users, questions }, { id }) {
  //get the current question from the questions store state by id
  const question = questions[id];

  //get the author & properties
  const author = {
    avatarUrl: users[question.author] ? users[question.author].avatarURL : null,
    name: users[question.author] ? users[question.author].name : null
  };

  //pass from store to component
  return {
    //get the question, author of the question
    question,
    author,
    users
  };
}

export default connect(mapStateToProps)(Question);
