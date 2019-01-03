import Avatar from "@material-ui/core/es/Avatar/Avatar";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import { bindActionCreators } from "redux";
import * as Actions from "../store/actions";
import { Helpers } from "utils";
import { Button, Icon, Typography, withStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class Question extends Component {
  render() {
    const {
      question,
      author,
      updateQuestion,
      handleAddVote,
      handleVoteCount,
      handleVotePercent,
      classes,
      auth
    } = this.props;

    if (!question) {
      return "";
    }

    return (
      <div className="flex flex-wrap pb-32">
        <div className="widget flex flex-wrap w-full p-16">
          <div className="w-full sm:w-2/3">
            <div className="flex flex-wrap ">
              <Avatar
                className="mr-8"
                alt={author.data.name}
                src={author.data.avatarURL}
              />
              <p>{author.data.name}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/3">
            <div className="flex flex-wrap ">
              <Icon className="text-20 mr-8" color="inherit">
                access_time
              </Icon>
              <Typography variant="caption">
                {Helpers.formatDate(question.timestamp)}
              </Typography>
            </div>
            <Typography variant="caption">{question.id}</Typography>
          </div>
        </div>
        <div className="flex w-full justify-center m-32">
          <Typography variant="h6">Would You Rather?</Typography>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <p>optionOne: {question.answers.answerOne.text}</p>
          <p>Votes Count: {handleVoteCount(question.answers.answerOne)}</p>
          <p>Votes Percent: {handleVotePercent(question.answers.answerOne)}</p>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => updateQuestion(auth.user, question.id, "answerOne")}
          >
            Vote
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <p>optionTwo: {question.answers.answerTwo.text}</p>

          <p>Votes Count: {handleVoteCount(question.answers.answerTwo)}</p>
          <p>Votes Percent: {handleVotePercent(question.answers.answerTwo)}</p>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => updateQuestion(auth.user, question.id, "answerTwo")}
          >
            Vote
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateQuestion: Actions.updateQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }, { question }) {
  const author = _.find(auth.users, { id: question.author.id });
  return {
    question,
    author,
    auth
  };
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Question)
  )
);
