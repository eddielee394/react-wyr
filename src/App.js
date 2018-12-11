//Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

//components
import DashboardPage from "./components/_pages/dashboard/DashboardPage";

//methods
import { handleInitialData } from "./store/actions/shared";

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
      <main className="main-wrapper">
        <div className="main-page container">
          <div className="row">
            <div className="col-12">
              <DashboardPage />
            </div>
          </div>
        </div>
      </main>
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
