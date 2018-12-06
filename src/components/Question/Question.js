import React from "react";
import { connect } from "react-redux";
import { handleVoteQuestionAnswer } from "../../actions/questions";
import { calcPercent } from "../../utils/helpers";

const Question = props => {
  const { question, author, users, dispatch } = props;

  //handle adding a vote
  const handleAddVote = event => {
    event.preventDefault();
    const authUser = "burt_b";
    const option = "optionOne";
    dispatch(
      handleVoteQuestionAnswer({
        authUser,
        questionId: question.id,
        answer: option
      })
    );
  };

  //get Vote counts by option
  const getVoteCount = (option = null) => handleVoteCount(option);

  //get vote percentage by option
  const getVotePercent = (option = null) => handleVotePercent(option);

  //get users count
  const getUserCount = () => {
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

  return (
    <div>
      <h1>Would you rather?</h1>
      <p>id: {question.id}</p>
      <p>author: {author.name}</p>
      <img src={author.avatarUrl} />
      <p>timestamp: {question.timestamp}</p>
      <p>optionOne: {question.optionOne.text}</p>
      <button onClick={handleAddVote}>Vote</button>
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
function mapStateToProps({ users, questions, authUser }, { id }) {
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
