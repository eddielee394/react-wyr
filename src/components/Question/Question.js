import React from "react";
import { connect } from "react-redux";

const Question = props => {
  const { question, author } = props;

  return (
    <div>
      <h1>Would you rather?</h1>
      <p>id: {question.id}</p>
      <p>author: {author.name}</p>
      <img src={author.avatarUrl} />
      <p>timestamp: {question.timestamp}</p>
      <p>optionOne: {question.optionOne.text}</p>
      <p>optionTwo: {question.optionTwo.text}</p>
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
    author
  };
}

export default connect(mapStateToProps)(Question);
