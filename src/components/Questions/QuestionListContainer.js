import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleInitialData } from "store/actions/shared.actions";
import withReducer from "store/withReducer";
import { withStyles } from "@material-ui/core";
import { QuestionList } from "components/Questions";

class QuestionListContainer extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { questionIds } = this.props;
    return <QuestionList questionIds={questionIds} />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleInitialData
    },
    dispatch
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionListContainer);
