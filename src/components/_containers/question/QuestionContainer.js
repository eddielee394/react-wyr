import { connect } from "react-redux";
import { Question } from "../../Question/index";
import React, { Component } from "react";
import { handleVoteQuestionAnswer } from "../../../store/actions/question.actions";
import { Helpers } from "../../../utils";

class QuestionContainer extends Component {
  /**
   * Add vote handler
   * @param event
   */
  handleAddVote = event => this.addVote(event);

  /**
   * Vote count handler
   * @param option
   * @return {*}
   */
  handleVoteCount = (option = null) => this.getVoteCount(option);

  /**
   * Vote percent handler
   * @param option
   */
  handleVotePercent = (option = null) => this.getVotePercent(option);

  /**
   * Get Vote count
   * @description gets number of votes for the current question option
   * @param option
   * @return {*}
   */
  getVoteCount = option => option.votes.length;

  /**
   * Get vote percent
   * @description gets the percentage of the current users in the state that voted for the option
   * @param option
   * @return {string}
   */
  getVotePercent = option => {
    let usersCount = this.getUserCount();
    let voteCount = this.getVoteCount(option);
    return Helpers.calcPercent(voteCount, usersCount);
  };

  /**
   * Adds the vote to the store
   * @description dispatches the handleVoteQuestionAnswer action
   * @param event
   */
  addVote = event => {
    event.preventDefault();
    const { question, dispatch } = this.props;
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

  /**
   * Get the user count
   * @description gets the total number of registered users from the store
   * @return {number}
   */
  getUserCount = () => {
    const { users } = this.props;
    return Object.keys(users).length;
  };

  render() {
    const { handleAddVote, handleVoteCount, handleVotePercent } = this;
    const { ...props } = this.props;
    return (
      <Question
        handleAddVote={handleAddVote}
        handleVoteCount={handleVoteCount}
        handleVotePercent={handleVotePercent}
        {...props}
      />
    );
  }
}

/**
 * Map state to props from store
 * @param users
 * @param questions
 * @param authUser
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

export default connect(mapStateToProps)(QuestionContainer);
