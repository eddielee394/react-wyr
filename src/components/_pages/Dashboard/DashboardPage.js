import React, { Component } from "react";
import { connect } from "react-redux";

class DashboardPage extends Component {
  /**
   * fires after the component is mounted
   *
   */
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <h1>This is the Dashboard!</h1>
        {/*<QuestionListContainer />*/}
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
