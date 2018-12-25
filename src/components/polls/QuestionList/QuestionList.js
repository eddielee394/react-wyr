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
import { Helpers } from "utils";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper/Paper";
import SwipeableViews from "react-swipeable-views";
import { green } from "@material-ui/core/colors";
import { Link, withRouter } from "react-router-dom";
import QuestionTest from "components/polls/Question/QuestionTest";
import _ from "@lodash";

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

class QuestionList extends Component {
  componentDidMount() {
    /**
     * Get the Question list data
     */
    const { params } = this.props.match;
    this.props.getQuestionsByCategory(params);
    this.props.getQuestion(params);
  }

  componentDidUpdate(prevProps) {
    /**
     * If the Question is opened for the first time
     * Show all questions
     */
    const { params } = this.props.match;

    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.props.getQuestion(params);
    }
  }

  handleChangeQuestion = id => {
    // const { params } = this.props.match;
    const { category, question } = this.props;
    const categoryId = category.value;

    this.props.history.push(`/questions/${categoryId}/${id}`);
    // this.props.getQuestion(params);
  };

  handleChangeIndex = index => {
    const { questions } = this.props;
    if (index > -1) {
      const questionId = questions[index].id;
      this.handleChangeQuestion(questionId);
    }
  };

  handleNext = index => {
    index = index + 1;
    this.handleChangeIndex(index);
  };

  handleBack = index => {
    index = index - 1;
    this.handleChangeIndex(index);
  };

  userHasAnswered = questionId => {
    const { auth } = this.props;
    return Object.keys(auth.user.data.answers).includes(questionId);
  };

  /**
   * Add vote handler
   * @param event
   */
  handleAddVote = event => {
    console.log("handleAddVote", event);
    //this.addVote(event);
  };

  /**
   * Vote count handler
   * @param option
   * @return {*}
   */
  handleVoteCount = (option = null) => this.getVoteCount(option);

  /**
   * Vote percent handler
   * @param option
   */
  handleVotePercent = (option = null) => this.getVotePercent(option);

  /**
   * Get Vote count
   * @description gets number of votes for the current question option
   * @param option
   * @return {*}
   */
  getVoteCount = option => option.votes.length;

  /**
   * Get vote percent
   * @description gets the percentage of the current users in the state that voted for the option
   * @param option
   * @return {string}
   */
  getVotePercent = option => {
    let usersCount = this.getUserCount();
    let voteCount = this.getVoteCount(option);
    return Helpers.calcPercent(voteCount, usersCount);
  };

  /**
   * Adds the vote to the store
   * @description dispatches the handleVoteQuestionAnswer action
   * @param event
   */
  addVote = event => {
    event.preventDefault();
    const { question, dispatch } = this.props;
    const authUser = "burt_b";
    const option = "optionOne";
    console.log("addVote: ", event);
    // dispatch(
    //   handleVoteQuestionAnswer({
    //     authUser,
    //     questionId: question.id,
    //     answer: option
    //   })
    // );
  };

  /**
   * Get the user count
   * @description gets the total number of registered users from the store
   * @return {number}
   */
  getUserCount = () => {
    const { users } = this.props;
    return Object.keys(users).length;
  };

  render() {
    const {
      classes,
      question,
      questions,
      category,
      match,
      route,
      ...props
    } = this.props;
    const { params } = match;
    console.log("user has answered", this.userHasAnswered());
    const index = questions.findIndex(
      _question => _question.id === question.id
    );

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
            {questions && (
              <Typography className="flex-1 text-20">
                {category.label}
              </Typography>
            )}
          </div>
        }
        content={
          // question && (
          <div className="flex flex-1 relative overflow-hidden">
            <FuseScrollbars className="w-full overflow-auto">
              <SwipeableViews
                className="overflow-hidden"
                index={index}
                onChangeIndex={this.handleChangeIndex}
                enableMouseEvents={true}
              >
                {questions.map((_question, index) => (
                  <div
                    className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
                    key={_question.id}
                  >
                    <Paper
                      className="w-full max-w-lg rounded-8 p-16 md:p-24"
                      elevation={1}
                    >
                      {params.questionId ? (
                        <QuestionTest
                          key={_question.id}
                          handleAddVote={this.handleAddVote}
                          handleVoteCount={this.handleVoteCount}
                          handleVotePercent={this.handleVotePercent}
                          question={_question}
                          {...props}
                        />
                      ) : (
                        "Show list of all questions"
                      )}
                    </Paper>
                  </div>
                ))}
              </SwipeableViews>
            </FuseScrollbars>

            <div className="flex justify-center w-full absolute pin-l pin-r pin-b pb-16 md:pb-32">
              <div className="flex justify-between w-full max-w-xl px-8">
                <div>
                  {index !== 0 && (
                    <Fab
                      className=""
                      color="secondary"
                      onClick={() => this.handleBack(index)}
                    >
                      <Icon>chevron_left</Icon>
                    </Fab>
                  )}
                </div>
                <div>
                  {index < questions.length - 1 ? (
                    <Fab
                      className=""
                      color="secondary"
                      onClick={() => this.handleNext(index)}
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
          // )
        }
        leftSidebarContent={
          <Stepper
            classes={{ root: classes.stepper }}
            activeStep={index - 1}
            orientation="vertical"
          >
            {questions.map((_question, index) => {
              return (
                <Step
                  classes={{ root: classes.step }}
                  key={_question.id}
                  completed={this.userHasAnswered(_question.id)}
                  onClick={() => this.handleChangeQuestion(_question.id)}
                >
                  <StepLabel classes={{ root: classes.stepLabel }}>
                    {_question.title}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
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
      getCategories: Actions.getCategories,
      getQuestionsByCategory: Actions.getQuestionsByCategory,
      updateQuestion: Actions.updateQuestion,
      getQuestion: Actions.getQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls, users, auth }) {
  // const { categories } = polls.questions;
  // const questions = polls.questions.data;
  // const categoryName = _category.label;
  // const _category = _.find(categories, { value: categoryValue });
  //get the author & properties
  // const author = {
  //   avatarUrl: users[question.author] ? users[question.author].avatarURL : null,
  //   name: users[question.author] ? users[question.author].name : null
  // };
  return {
    question: polls.question,
    questions: polls.questions.data,
    category: polls.questions.category,
    auth,
    users
    // categoryName
  };
}

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(QuestionList)
    )
  )
);
