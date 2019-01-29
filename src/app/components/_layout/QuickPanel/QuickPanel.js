import { Drawer, withStyles } from "@material-ui/core";
import * as Actions from "app/components/_layout/QuickPanel/store/actions";
import reducer from "app/components/_layout/QuickPanel/store/reducers";
import { QuestionAdd } from "app/components/polls/Questions";
import withReducer from "app/store/withReducer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
        <QuestionAdd />
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

const styles = () => ({
  root: {
    width: 380,
    padding: 24
  }
});

export default withReducer("quickPanel", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(QuickPanel)
  )
);
