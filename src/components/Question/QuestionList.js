import React, { Component } from "react";
import { connect } from "react-redux";
import { QuestionContainer } from "../../containers/Question";

class QuestionList extends Component {
  render() {
    const { questionIds } = this.props;
    const listQuestions = questionIds.map(id => <Question key={id} id={id} />);
    return <div>{listQuestions}</div>;
  }
}

/**
 * Map state to props from store
 * @param questions
 * @return {{questionIds: string[]}}
 */
function mapStateToProps({ questions }) {
  return {
    //get question id's
    questionIds: Object.keys(questions).sort(
      //sort by timestamp
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(QuestionList);
