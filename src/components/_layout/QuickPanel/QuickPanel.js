import React, { Component } from "react";
import { Drawer, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./store/actions/index";
import withReducer from "store/withReducer";
import reducer from "./store/reducers";

const styles = theme => ({
  root: {
    width: 380,
    padding: 24
  }
});

class QuickPanel extends Component {
  render() {
    const { classes, state, toggleQuickPanel } = this.props;
    return (
      <Drawer
        classes={{ paper: classes.root }}
        open={state}
        anchor="right"
        onClose={() => toggleQuickPanel(false)}
      >
        <Typography>Add Question</Typography>
      </Drawer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleQuickPanel: Actions.toggleQuickPanel
    },
    dispatch
  );
}

function mapStateToProps({ quickPanel }) {
  return {
    state: quickPanel.state
  };
}

export default withReducer("quickPanel", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(QuickPanel)
  )
);
