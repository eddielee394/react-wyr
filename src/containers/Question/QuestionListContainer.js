import React, { Component } from "react";
import { connect } from "react-redux";
import { QuestionList } from "../../components/Question";

class QuestionListContainer extends Component {
  render() {
    const { questionIds } = this.props;
    return <QuestionList questionIds={questionIds} />;
  }
}

/**
 * Map state to props from store
 * @param questions
 * @return {{questionIds: string[]}}
 */
function mapStateToProps({ questions }) {
  const questionIds = Object.keys(questions).sort(
    //sort by timestamp
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  return {
    //get question id's
    questionIds
  };
}

export default connect(mapStateToProps)(QuestionListContainer);
