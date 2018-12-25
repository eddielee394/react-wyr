import React, { Component } from "react";
import { FusePageSimple, FuseScrollbars } from "@fuse";
import {
  withStyles,
  Hidden,
  Icon,
  IconButton,
  Fab,
  Typography,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";
import withReducer from "store/withReducer";
import { bindActionCreators } from "redux";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper/Paper";
import SwipeableViews from "react-swipeable-views";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const styles = theme => ({
  layoutRoot: {},
  layoutHeader: {
    height: 72,
    minHeight: 72
  },
  layoutContent: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    overflow: "hidden"
  },
  stepper: {
    background: "transparent"
  },
  step: {},
  stepLabel: {
    cursor: "pointer!important"
  },
  successFab: {
    background: green[500] + "!important",
    color: "white!important"
  }
});

class Question extends Component {
  componentDidMount() {
    /**
     * Get the Question Data
     */
    this.props.getQuestion(this.props.match.params);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * If the Question is opened for the first time
     * Change ActiveStep to 1
     */
    if (this.props.question && this.props.question.activeStep === 0) {
      this.props.updateQuestion({ activeStep: 1 });
    }
  }

  handleChangeActiveStep = index => {
    this.props.updateQuestion({ activeStep: index + 1 });
  };

  handleNext = () => {
    this.props.updateQuestion({
      activeStep: this.props.question.activeStep + 1
    });
  };

  handleBack = () => {
    this.props.updateQuestion({
      activeStep: this.props.question.activeStep - 1
    });
  };

  render() {
    const { classes, question } = this.props;
    const activeStep =
      question && question.activeStep !== 0 ? question.activeStep : 1;

    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          content: classes.layoutContent,
          header: classes.layoutHeader
        }}
        header={
          <div className="flex flex-1 items-center">
            <Hidden lgUp>
              <IconButton
                onClick={ev => this.pageLayout.toggleLeftSidebar()}
                aria-label="open left sidebar"
              >
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
            <IconButton className="mr-16" to="/questions" component={Link}>
              <Icon>arrow_back</Icon>
            </IconButton>
            {question && (
              <Typography className="flex-1 text-20">
                {question.title}
              </Typography>
            )}
          </div>
        }
        content={
          question && (
            <div className="flex flex-1 relative overflow-hidden">
              <FuseScrollbars className="w-full overflow-auto">
                <SwipeableViews
                  className="overflow-hidden"
                  index={activeStep - 1}
                  enableMouseEvents={true}
                >
                  {question.steps.map((step, index) => (
                    <div
                      className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
                      key={step.id}
                    >
                      <Paper
                        className="w-full max-w-lg rounded-8 p-16 md:p-24"
                        elevation={1}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: step.content }}
                        />
                      </Paper>
                    </div>
                  ))}
                </SwipeableViews>
              </FuseScrollbars>

              <div className="flex justify-center w-full absolute pin-l pin-r pin-b pb-16 md:pb-32">
                <div className="flex justify-between w-full max-w-xl px-8">
                  <div>
                    {activeStep !== 1 && (
                      <Fab
                        className=""
                        color="secondary"
                        onClick={this.handleBack}
                      >
                        <Icon>chevron_left</Icon>
                      </Fab>
                    )}
                  </div>
                  <div>
                    {activeStep < question.steps.length ? (
                      <Fab
                        className=""
                        color="secondary"
                        onClick={this.handleNext}
                      >
                        <Icon>chevron_right</Icon>
                      </Fab>
                    ) : (
                      <Fab
                        className={classes.successFab}
                        to="/questions"
                        component={Link}
                      >
                        <Icon>check</Icon>
                      </Fab>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        leftSidebarContent={
          question && (
            <Stepper
              classes={{ root: classes.stepper }}
              activeStep={activeStep - 1}
              orientation="vertical"
            >
              {question.steps.map((step, index) => {
                return (
                  <Step
                    classes={{ root: classes.step }}
                    key={step.id}
                    onClick={() => this.handleChangeActiveStep(index)}
                  >
                    <StepLabel classes={{ root: classes.stepLabel }}>
                      {step.title}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          )
        }
        innerScroll
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuestion: Actions.getQuestion,
      updateQuestion: Actions.updateQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls }) {
  return {
    question: polls.question
  };
}

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Question)
  )
);
