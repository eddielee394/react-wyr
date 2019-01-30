import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Icon,
  Typography,
  withStyles
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helpers } from "utils";

const Question = props => {
  const {
    question,
    author,
    handleAddVote,
    handleVoteCount,
    handleVotePercent,
    userHasAnswered,
    isUserAnswer,
    classes
  } = props;

  const answerOneClass = isUserAnswer(question.id, "answerOne")
    ? classes.contrastCard
    : classes.flatCard;

  const answerTwoClass = isUserAnswer(question.id, "answerTwo")
    ? classes.contrastCard
    : classes.flatCard;

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
        <Typography variant="h4">Would You Rather?</Typography>
      </div>

      <div className="flex flex-col w-full sm:w-1/2">
        <Card className={classNames(answerOneClass, "m-16 p-6 relative")}>
          {isUserAnswer(question.id, "answerOne") && (
            <Avatar className={classNames(classes.answeredIcon)}>
              <Icon>star</Icon>
            </Avatar>
          )}
          <CardContent>
            <Typography variant="h6" className="sm:text-center">
              {question.answers.answerOne.text}
            </Typography>
            {userHasAnswered ? (
              <div className="flex flex-col w-full">
                <div className="progress-container flex justify-center my-16 relative">
                  <CircularProgress
                    className="w-full"
                    variant="determinate"
                    thickness={7.2}
                    size={120}
                    value={handleVotePercent(question.answers.answerOne)}
                    color="secondary"
                  />
                  <div
                    className={classNames(
                      classes.progressText,
                      "font-700 text-28"
                    )}
                  >
                    {handleVotePercent(question.answers.answerOne)}%
                  </div>
                </div>
                <div className="container sm:text-center font-700">
                  Total Votes: {handleVoteCount(question.answers.answerOne)}
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full my-16">
                <Button
                  variant="contained"
                  color="default"
                  fullWidth={true}
                  className={classes.button}
                  onClick={() =>
                    handleAddVote({
                      questionId: question.id,
                      answerId: "answerOne"
                    })
                  }
                >
                  Vote
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col w-full sm:w-1/2">
        <Card className={classNames(answerTwoClass, "m-16 p-6 relative")}>
          {isUserAnswer(question.id, "answerTwo") && (
            <Avatar className={classNames(classes.answeredIcon)}>
              <Icon>star</Icon>
            </Avatar>
          )}
          <CardContent>
            <Typography variant="h6" className="sm:text-center">
              {question.answers.answerTwo.text}
            </Typography>
            {userHasAnswered ? (
              <div className="flex flex-col w-full">
                <div className="progress-container flex justify-center my-16 relative">
                  <CircularProgress
                    className="w-full"
                    variant="determinate"
                    thickness={7.2}
                    size={120}
                    value={handleVotePercent(question.answers.answerTwo)}
                    color="secondary"
                  />
                  <div
                    className={classNames(
                      classes.progressText,
                      "font-700 text-28"
                    )}
                  >
                    {handleVotePercent(question.answers.answerTwo)}%
                  </div>
                </div>
                <div className="container sm:text-center font-700">
                  Total Votes: {handleVoteCount(question.answers.answerTwo)}
                </div>
              </div>
            ) : (
              <div className="flex w-full my-16">
                <Button
                  variant="contained"
                  color="default"
                  fullWidth={true}
                  className={classes.button}
                  onClick={() =>
                    handleAddVote({
                      questionId: question.id,
                      answerId: "answerTwo"
                    })
                  }
                >
                  Vote
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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
  contrastCard: {
    overflow: "visible",
    boxShadow:
      "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)"
  },
  flatCard: {
    boxShadow: "none"
  },
  answeredIcon: {
    position: "absolute",
    top: "-10px",
    right: "-5px",
    backgroundColor: "#ffd600",
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  answeredIconContainer: {},
  progressText: {
    position: "absolute",
    top: "30%",
    left: "0",
    right: "0",
    margin: "auto",
    maxWidth: "45px"
  },
  iconSmall: {
    fontSize: 20
  }
});

export default withStyles(styles)(Question);
