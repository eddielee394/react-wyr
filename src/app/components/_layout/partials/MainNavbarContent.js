import { FuseLayouts, FuseNavigation } from "@fuse";
import {
  AppBar,
  Avatar,
  Hidden,
  Typography,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import MainToolbar from "./MainToolbar";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

function MainNavbar({ classes, navigation, layoutStyle, user }) {
  function UserHeader() {
    return (
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
      >
        <Typography
          className="username text-16 whitespace-no-wrap"
          color="inherit"
        >
          {user.data.displayName}
        </Typography>
        <Typography
          className="email text-13 mt-8 opacity-50 whitespace-no-wrap"
          color="inherit"
        >
          {user.data.email}
        </Typography>
        <Avatar
          className={classNames(classes.avatar, "avatar")}
          alt="user photo"
          src={
            user.data.avatarURL && user.data.avatarURL !== ""
              ? user.data.avatarURL
              : "assets/images/avatars/profile.jpg"
          }
        />
      </AppBar>
    );
  }

  const navigationLayout = FuseLayouts[layoutStyle].type;
  return (
    <div className={classes.root}>
      {navigationLayout === "vertical" ? (
        <React.Fragment>
          <UserHeader />
          <FuseNavigation navigation={navigation} layout={navigationLayout} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="flex flex-row">
            <FuseNavigation navigation={navigation} layout={navigationLayout} />
            <MainToolbar />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ fuse, auth }) {
  return {
    navigation: fuse.navigation,
    layoutStyle: fuse.settings.current.layout.style,
    user: auth.user
  };
}

const styles = theme => ({
  root: {
    "& .user": {
      "& .username, & .email": {
        transition: theme.transitions.create("opacity", {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 72,
    height: 72,
    position: "absolute",
    top: 92,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: "content-box",
    left: "50%",
    transform: "translateX(-50%)",
    "& > img": {
      borderRadius: "50%"
    }
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(MainNavbar)
  )
);
