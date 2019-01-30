import { withStyles } from "@material-ui/core";
import logo from "assets/images/logos/logo_landscape.png";
import classNames from "classnames";
import React from "react";
import { withRouter } from "react-router-dom";

function MainNavbarHeader({ classes }) {
  return (
    <div className={classes.root}>
      <div className={classNames(classes.logo, "flex items-center")}>
        <img
          className={classNames(classes.logoIcon, "logo-icon")}
          src={logo}
          alt="logo"
        />
      </div>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& .logo-text, & .react-badge": {
      transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    }
  },
  logo: {},
  logoIcon: {
    maxWidth: 200,
    height: "auto",
    transition: theme.transitions.create(["maxWidth", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  reactBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#61dafb"
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(MainNavbarHeader)
);
