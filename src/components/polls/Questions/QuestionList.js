import { FuseAnimateGroup } from "@fuse";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  LinearProgress,
  Typography,
  withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";

class QuestionList extends Component {
  buttonStatus = questionId =>
    this.props.userHasAnswered(questionId) ? "COMPLETED" : "START";

  render() {
    const {
      questions,
      category,
      theme,
      handleVotePercent,
      handleGetAuthor
    } = this.props;

    if (questions.length === 0) {
      return (
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
          className="flex flex-wrap py-24 items-center justify-center"
        >
          <Typography color="textSecondary" variant="h5">
            No questions match your search
          </Typography>
        </FuseAnimateGroup>
      );
    }

    return (
      <FuseAnimateGroup
        enter={{
          animation: "transition.slideUpBigIn"
        }}
        className="flex flex-wrap py-24"
      >
        {questions.map(question => {
          const author = handleGetAuthor(question);

          return (
            <div
              className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16"
              key={question.id}
            >
              <Card elevation={1} className="flex flex-col min-h-256">
                <div
                  className="flex items-center justify-between px-24 h-64"
                  style={{
                    background: category.color,
                    color: theme.palette.getContrastText(category.color)
                  }}
                >
                  <Avatar src={author.data.avatarURL} />
                  <Typography className="font-medium truncate" color="inherit">
                    {author.data.displayName}
                  </Typography>
                  <div className="flex items-center justify-center opacity-75">
                    <Icon className="text-20 mr-8" color="inherit">
                      access_time
                    </Icon>
                    <div className="text-16 whitespace-no-wrap">
                      {question.length} min
                    </div>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 items-center justify-center">
                  <Typography className="text-center text-16 font-400">
                    {question.title}
                  </Typography>
                  <Typography
                    className="text-center text-13 font-600 mt-4"
                    color="textSecondary"
                  >
                    {question.updated}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions className="justify-center">
                  <Button
                    to={`/questions/${category.value}/${question.id}`}
                    component={Link}
                    className="justify-start px-32"
                    color="secondary"
                  >
                    {this.buttonStatus(question.id)}
                  </Button>
                </CardActions>
                <LinearProgress
                  className="w-full"
                  variant="determinate"
                  value={handleVotePercent(question.answers.answerOne)}
                  color="secondary"
                />
              </Card>
            </div>
          );
        })}
      </FuseAnimateGroup>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategories: Actions.getCategories,
      getQuestionsByCategory: Actions.getQuestionsByCategory,
      updateQuestion: Actions.updateQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }, props) {
  return {
    questions: props.questions,
    category: props.category,
    auth
  };
}

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
