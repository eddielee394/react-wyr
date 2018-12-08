import {
  withStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  LinearProgress,
  Typography
} from "@material-ui/core";
import * as Actions from "components/polls/store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Helpers } from "utils";

const styles = theme => ({
  root: {
    width: "100%"
  },
  header: {
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  headerIcon: {
    position: "absolute",
    top: -64,
    left: 0,
    opacity: 0.04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: "none"
  },
  content: {}
});

class CategoryItem extends Component {
  componentDidMount() {
    console.log("component mounted");
    // this.props.getCategory({ categoryId: this.props.categoryId });
    // this.props.getQuestion({ questionId: this.props.questionId });
  }

  buttonStatus = question => {
    const { authUser } = this.props;
    switch (question.activeStep) {
      case question.totalSteps:
        return "COMPLETED";
      case 0:
        return "START";
      default:
        return "CONTINUE";
    }
  };

  render() {
    const { category, question, theme } = this.props;
    console.log("CategoryItem props: ", this.props);

    // return <h1>CategoryItem Component</h1>;

    return (
      <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={question.id}>
        <Card elevation={1} className="flex flex-col min-h-256">
          <div
            className="flex items-center justify-between px-24 h-64"
            style={{
              background: category.color,
              color: theme.palette.getContrastText(category.color)
            }}
          >
            <Button href={`/questions/${category.value}`}>
              <Typography className="font-medium truncate" variant="button">
                {category.label}
              </Typography>
            </Button>
            <div className="flex items-center justify-center opacity-75">
              <Icon className="text-20 mr-8" color="inherit">
                access_time
              </Icon>
              <div className="text-16 whitespace-no-wrap">
                <Typography variant="caption">
                  {Helpers.formatDate(question.timestamp)}
                </Typography>
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
              {this.buttonStatus(question)}
            </Button>
          </CardActions>
          <LinearProgress
            className="w-full"
            variant="determinate"
            value={(question.activeStep * 100) / question.totalSteps}
            color="secondary"
          />
        </Card>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategory: Actions.getCategory,
      getQuestion: Actions.getQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls }, props) {
  //pass from store to component
  const { question, category } = props;
  return {
    // question: polls.question,
    // category: polls.questions.category
    question: question,
    category: category
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryItem)
);
