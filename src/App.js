//Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "./@lodash";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";

//components
import DashboardPage from "./components/_pages/Dashboard/DashboardPage";
import LoginPage from "components/_pages/auth/Login/LoginPage";

//methods
import { handleInitialData } from "store/actions";

class App extends Component {
  /**
   * fires after the component is mounted
   *
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location.pathname, prevProps.location.pathname)) {
      this.routeSettingsCheck();
    }
  }

  routeSettingsCheck = () => {
    const matched = matchRoutes(
      this.props.routes,
      this.props.location.pathname
    )[0];

    if (matched && matched.route.settings) {
      const routeSettings = _.merge(
        {},
        this.props.defaultSettings,
        matched.route.settings
      );
      if (!_.isEqual(this.props.settings, routeSettings)) {
        this.props.setSettings(_.merge({}, routeSettings));
      }
    } else {
      if (!_.isEqual(this.props.settings, this.props.defaultSettings)) {
        this.props.resetSettings();
      }
    }
  };

  render() {
    return (
      <main className="main-wrapper">
        <div className="main-page container">
          <div className="row">
            <div className="col-12">
              <DashboardPage />
              {/*<LoginPage />*/}
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

export default withRouter(connect(mapStateToProps)(App));
