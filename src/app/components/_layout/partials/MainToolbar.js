import { FuseAnimate } from "@fuse";
import {
  Avatar,
  Button,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  withStyles
} from "@material-ui/core";
import * as authActions from "app/auth/store/actions";
import * as quickPanelActions from "app/components/_layout/QuickPanel/store/actions";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

class MainToolbar extends Component {
  state = {
    userMenu: null
  };

  userMenuClick = event => {
    this.setState({ userMenu: event.currentTarget });
  };

  userMenuClose = () => {
    this.setState({ userMenu: null });
  };

  render() {
    const { classes, toggleQuickPanel, user, logout } = this.props;
    const { userMenu } = this.state;

    return (
      <div className={classNames(classes.root, "flex justify-end")}>
        <FuseAnimate delay={300}>
          <Button className="h-64" onClick={this.userMenuClick}>
            {user.data.avatarURL ? (
              <Avatar className="" alt="user photo" src={user.data.avatarURL} />
            ) : (
              <Avatar className="">{user.data.displayName[0]}</Avatar>
            )}

            <div className="hidden md:flex flex-col ml-12 items-start">
              <Typography
                component="span"
                className="normal-case font-600 flex"
              >
                {user.data.displayName}
              </Typography>
              <Typography className="text-11 capitalize" color="textSecondary">
                {user.role}
              </Typography>
            </div>

            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
              keyboard_arrow_down
            </Icon>
          </Button>
        </FuseAnimate>

        <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={this.userMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          classes={{
            paper: "py-8"
          }}
        >
          {user.role === "guest" ? (
            <React.Fragment>
              <MenuItem component={Link} to="/login">
                <ListItemIcon>
                  <Icon>lock</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Login" />
              </MenuItem>
              <MenuItem component={Link} to="/register">
                <ListItemIcon>
                  <Icon>person_add</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Register" />
              </MenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MenuItem
                component={Link}
                to="/dashboard"
                onClick={this.userMenuClose}
              >
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="My Profile" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  this.userMenuClose();
                }}
              >
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Logout" />
              </MenuItem>
            </React.Fragment>
          )}
        </Popover>

        <div className={classes.separator} />
        <IconButton
          className="w-64 h-64"
          onClick={() => toggleQuickPanel(true)}
        >
          <Icon>library_add</Icon>
        </IconButton>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleQuickPanel: quickPanelActions.toggleQuickPanel,
      logout: authActions.submitLogout
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainToolbar)
);
