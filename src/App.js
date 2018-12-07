//Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

//components
// import Dashboard from "./components/Dashboard";

//methods
import { handleInitialData } from "./actions/shared";
import { QuestionListContainer } from "./containers/Question";

class App extends Component {
  /**
   * fires after the component is mounted
   *
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="main-wrapper container">
        <div className="row">
          <div className="col-12">
            <QuestionListContainer />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  //do logic

  //pass from store to component
  return {
    questions
  };
}

export default connect(mapStateToProps)(App);
