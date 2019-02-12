import { FusePageSimple, FuseScrollbars } from "@fuse";
import _ from "@lodash";
import {
  Fab,
  Hidden,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  Typography,
  withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper/Paper";
import * as Actions from "app/components/polls/store/actions";
import reducer from "app/components/polls/store/reducers";
import withReducer from "app/store/withReducer";
import { Helpers } from "app/utils";
import { Question, QuestionList } from "app/components/polls/Questions";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import SwipeableViews from "react-swipeable-views";
import { bindActionCreators } from "redux";

class QuestionListContainer extends Component {
  state = {
    contentLoaded: false
  };

  componentDidMount() {
    /**
     * Get the Question list data
     */
    const { params } = this.props.match;

    Promise.all([
      this.props.getCategory(params),
      this.props.getQuestionsByCategory(params),
      this.props.getQuestion(params)
    ]).then(response => {
      this.setState({ contentLoaded: true });

      if (params.questionId) {
        this.props.question === null && this.props.history.push(`/error-404`);
      }
    });
  }

  componentDidUpdate(prevProps) {
    /**
     * get question based on url param
     */
    const { params } = this.props.match;

    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.handleChangeIndex({ questionId: params.questionId });

      if (params.questionId) {
        this.props.getQuestion(params).then(() => {
          this.setState({ contentLoaded: true });
          this.props.question === null && this.props.history.push(`/error-404`);
        });
      }
    }
  }

  handleChangeQuestion = questionId => {
    const { category } = this.props;
    const categoryId = category.value;
    return this.updateQuestionUrl({ questionId, categoryId });
  };

  updateQuestionUrl = (params = {}) => {
    const { questionId, categoryId } = params;
    if (!questionId) {
      return this.props.history.push(`/questions/${categoryId}`);
    }
    return this.props.history.push(`/questions/${categoryId}/${questionId}`);
  };

  handleChangeIndex = index => {
    const { questions } = this.props;
    if (index > -1 && index < questions.length) {
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
    const { authUser } = this.props;
    return Object.keys(authUser.data.answers).includes(questionId);
  };

  isUserAnswer = (questionId, answerId) => {
    const { auth } = this.props;
    const answers = auth.user.data.answers;

    if (this.userHasAnswered) {
      return answers[questionId] === answerId;
    }

    return false;
  };

  /**
   * Add vote handler
   * @param data
   */
  handleAddVote = data => {
    const userId = this.props.auth.user.id;
    const params = { ...data, userId };
    this.addVote(params);
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
   * @param data
   */
  addVote = data => {
    return this.props.updateQuestion(data);
  };

  /**
   * Get the user count
   * @description gets the total number of registered users from the store
   * @return {number}
   */
  getUserCount = () => {
    const { users } = this.props.auth;
    return Object.keys(users).length;
  };

  handleGetAuthor = question =>
    _.find(this.props.auth.users, { id: question.author.id });

  render() {
    const { classes, questions, category, stepIndex, match } = this.props;
    this.isUserAnswer();

    const headerTitle = (
      <Typography className="flex-1 text-20">{category.label}</Typography>
    );

    const questionListItem = (
      <div
        className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
        key="all"
      >
        <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
          <QuestionList
            category={category}
            questions={questions}
            userHasAnswered={this.userHasAnswered}
            handleGetAuthor={this.handleGetAuthor}
            handleVotePercent={this.handleVotePercent}
          />
        </Paper>
      </div>
    );

    const questionItems = questions.map(_question => (
      <div
        className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
        key={_question.id}
      >
        <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
          <Question
            key={_question.id}
            handleAddVote={this.handleAddVote}
            handleVoteCount={this.handleVoteCount}
            handleVotePercent={this.handleVotePercent}
            question={_question}
            userHasAnswered={this.userHasAnswered(_question.id)}
            isUserAnswer={this.isUserAnswer}
            author={this.handleGetAuthor(_question)}
          />
        </Paper>
      </div>
    ));

    const steps =
      this.state.contentLoaded === false ? (
        <div className="flex justify-center">
          <RingLoader color={"#039be5"} />
        </div>
      ) : (
        questions.map(_question => {
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
        })
      );

    const backControl = stepIndex > 0 && (
      <Fab
        className=""
        color="secondary"
        onClick={() => this.handleBack(stepIndex)}
      >
        <Icon>chevron_left</Icon>
      </Fab>
    );

    const nextControl =
      stepIndex >= 0 &&
      (stepIndex < questions.length - 1 ? (
        <Fab
          className=""
          color="secondary"
          onClick={() => this.handleNext(stepIndex)}
        >
          <Icon>chevron_right</Icon>
        </Fab>
      ) : (
        <Fab className={classes.successFab} href="/questions">
          <Icon>check</Icon>
        </Fab>
      ));

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
                onClick={event => this.pageLayout.toggleLeftSidebar()}
                aria-label="open left sidebar"
              >
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
            <IconButton className="mr-16" to="/questions" component={Link}>
              <Icon>arrow_back</Icon>
            </IconButton>
            {headerTitle}
          </div>
        }
        content={
          <div className="flex flex-1 relative overflow-hidden">
            <FuseScrollbars className="w-full overflow-auto">
              {stepIndex < 0 ? (
                questionListItem
              ) : (
                <SwipeableViews
                  className="overflow-hidden"
                  index={stepIndex}
                  onChangeIndex={this.handleChangeIndex}
                  enableMouseEvents={true}
                >
                  {questionItems}
                </SwipeableViews>
              )}
            </FuseScrollbars>

            <div className="flex justify-center w-full absolute pin-l pin-r pin-b pb-16 md:pb-32">
              <div className="flex justify-between w-full max-w-xl px-8">
                <div>{backControl}</div>
                <div>{nextControl}</div>
              </div>
            </div>
          </div>
        }
        leftSidebarContent={
          <div className="leftSidebar-container">
            <List>
              <ListItem
                button
                divider
                onClick={() => this.handleChangeQuestion()}
                className={classes.listItem}
                key="all"
              >
                <Icon className="list-item-icon" color="action">
                  view_carousel
                </Icon>
                <ListItemText primary="View All" disableTypography={true} />
              </ListItem>
            </List>
            <Stepper
              classes={{ root: classes.stepper }}
              activeStep={stepIndex}
              orientation="vertical"
            >
              {steps}
            </Stepper>
          </div>
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
      getCategory: Actions.getCategory,
      getQuestionsByCategory: Actions.getQuestionsByCategory,
      getQuestion: Actions.getQuestion,
      updateQuestion: Actions.updateQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }, props) {
  const { params } = props.match;

  const stepIndex = polls.questions.data.findIndex(
    _question => _question.id === params.questionId
  );

  return {
    category: polls.category.data,
    question: polls.question.data,
    questions: polls.questions.data,
    authUser: auth.user,
    auth,
    stepIndex
  };
}

const styles = () => ({
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

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(QuestionListContainer)
  )
);
