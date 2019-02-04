import { FusePageSimple } from "@fuse";
import _ from "@lodash";
import * as userActions from "app/components/Leaderboard/store/actions";
import reducer from "app/components/Leaderboard/store/reducers";
import withReducer from "app/store/withReducer";
import {
  LeaderboardList,
  LeaderboardSidebarContent
} from "app/components/Leaderboard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getUsersStats();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.props.user, prevProps.user) ||
      !_.isEqual(this.props.users, prevProps.users)
    ) {
      this.props.getUsers();
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
      getUsers: userActions.getUsers,
      getUsersStats: userActions.getUsersStats
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Leaderboard)
);
