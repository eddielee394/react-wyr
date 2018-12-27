import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "../store/actions";
import _ from "@lodash";

class Question extends Component {
  render() {
    const {
      question,
      author,
      handleAddVote,
      handleVoteCount,
      handleVotePercent
    } = this.props;
    if (!question) {
      return "";
    }

    return (
      <div>
        <p>id: {question.id}</p>
        {/*<p>author: {author.name}</p>*/} {/*<img src={author.avatarURL} />*/}
        <p>timestamp: {question.timestamp}</p>
        <p>optionOne: {question.answers[1].text}</p>
        <button onClick={handleAddVote}>Vote</button>
        <p>Votes Count: {handleVoteCount(question.answers[1])}</p>
        <p>Votes Percent: {handleVotePercent(question.answers[1])}</p>
        <p>optionTwo: {question.answers[2].text}</p>
        <p>Votes Count: {handleVoteCount(question.answers[2])}</p>
        <p>Votes Percent: {handleVotePercent(question.answers[2])}</p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuestion: Actions.getQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls }) {
  return {
    // question: polls.question
  };
}

export default withRouter(
  connect()(Question)
  // mapStateToProps,
  // null,
  // mapDispatchToProps
);
