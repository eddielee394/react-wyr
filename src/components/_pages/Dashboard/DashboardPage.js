import React from "react";
import { connect } from "react-redux";
import Profile from "components/Profile/Profile";

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
      <Profile />
    </div>
  );
};

export default connect()(DashboardPage);
