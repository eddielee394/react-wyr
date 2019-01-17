import { FusePageSimple } from "@fuse";
import _ from "@lodash";
import {
  LeaderboardList,
  LeaderboardSidebarContent
} from "components/Leaderboard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.match.params);
    this.props.getUsersStats();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getUsers(this.props.match.params);
      this.props.getUsersStats();
    }
  }

  render() {
    return (
      <FusePageSimple
        classes={{
          contentCardWrapper: "p-16 sm:p-24 pb-80 sm:pt-40",
          leftSidebar: "w-256 border-0 sm:pt-40"
        }}
        content={<LeaderboardList />}
        leftSidebarContent={<LeaderboardSidebarContent />}
        sidebarInner
        onRef={instance => {
          this.pageLayout = instance;
        }}
        innerScroll
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUsers: Actions.getUsers,
      getUsersStats: Actions.getUsersStats
    },
    dispatch
  );
}

function mapStateToProps({ leaderboard, auth }) {
  return {
    users: leaderboard.entities,
    searchText: leaderboard.searchText,
    user: auth.user
  };
}

export default withReducer("leaderboard", reducer)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Leaderboard)
  )
);
