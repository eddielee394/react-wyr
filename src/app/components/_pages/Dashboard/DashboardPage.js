import Profile from "app/components/Profile/Profile";
import React from "react";
import { connect } from "react-redux";

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
      <Profile />
    </div>
  );
};

export default connect()(DashboardPage);
