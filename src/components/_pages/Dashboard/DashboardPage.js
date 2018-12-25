import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "store/actions";
import { bindActionCreators } from "redux";
// import withReducer from "store/withReducer";
// import reducer from "auth/store/reducers";
// import axios from "axios";

class DashboardPage extends Component {
  /**
   * fires after the component is mounted
   *
   */
  componentDidMount() {
    // console.log(axios.get("/api/auth"));
    // this.props.getAllUsers();
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // getAllUsers: Actions.handleInitialData
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { users } = state;

  return {
    users
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
