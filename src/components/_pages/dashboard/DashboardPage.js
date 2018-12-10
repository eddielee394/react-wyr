import React, { Component } from "react";
import { connect } from "react-redux";
import { QuestionListContainer } from "../../_containers/question";

class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <QuestionListContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;

  return {
    users
  };
}

export default connect(mapStateToProps)(DashboardPage);
