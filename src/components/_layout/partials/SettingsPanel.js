import Drawer from "@material-ui/core/es/Drawer/Drawer";
import React, { Component } from "react";
import {
  Button,
  Typography,
  Dialog,
  Icon,
  IconButton,
  Slide,
  withStyles
} from "@material-ui/core";
import { FuseScrollbars, FuseSettings } from "@fuse";
import { red, grey, blueGrey } from "@material-ui/core/colors";
import classNames from "classnames";
import { DevTools } from "utils";

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

const styles = theme => ({
  header: {
    color: grey[300]
  },
  contentContainer: {
    paddingTop: "30px"
  },
  buttonClose: {
    color: grey[300]
  },
  button: {
    position: "absolute",
    right: 0,
    top: 160,
    minWidth: 48,
    width: 48,
    height: 48,
    opacity: 0.9,
    padding: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 999,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[500],
      opacity: 1
    }
  },
  "@keyframes rotating": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },
  buttonIcon: {
    animation: "rotating 3s linear infinite"
  },
  dialogPaper: {
    position: "fixed",
    width: 380,
    maxWidth: "90vw",
    backgroundColor: "#2A2F3A",
    boxShadow: theme.shadows[5],
    top: 0,
    height: "100%",
    minHeight: "100%",
    bottom: 0,
    right: 0,
    margin: 0,
    zIndex: 1000,
    borderRadius: 0,
    borderLeft: "1px solid rgba(0, 0, 0, 0.40)"
  }
});

class SettingsPanel extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderDevTools = () => {
    const { classes } = this.props;
    const devToolsExtActive = !!window.__REDUX_DEVTOOLS_EXTENSION__;
    if (devToolsExtActive) {
      return (
        <Typography
          className={classNames(classes.header, "mb-32")}
          variant="h6"
        >
          <a href="https://github.com/zalmoxisus/redux-devtools-extension">
            Redux DevTools extension
          </a>{" "}
          is currently active in your browser. Please disable the extension in
          your browser in order to view the in-app debug log.
        </Typography>
      );
    }
    return <DevTools />;
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.button}
          variant="contained"
          onClick={this.handleOpen}
        >
          <Icon className={classes.buttonIcon}>settings</Icon>
        </Button>

        <Drawer
          TransitionComponent={Transition}
          aria-labelledby="settings-panel"
          aria-describedby="settings"
          variant="persistent"
          anchor="right"
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          BackdropProps={{ invisible: true }}
          classes={{
            paper: classes.dialogPaper
          }}
        >
          <FuseScrollbars className="p-24 sm:p-32">
            <IconButton
              className={classNames(
                classes.buttonClose,
                "fixed pin-t pin-r z-10  "
              )}
              onClick={this.handleClose}
            >
              <Icon>close</Icon>
            </IconButton>

            <Typography
              className={classNames(classes.header, "mb-32")}
              variant="h6"
            >
              Debug Log
            </Typography>
            <div className={classNames(classes.contentContainer)}>
              {this.renderDevTools()}
            </div>
          </FuseScrollbars>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SettingsPanel);
