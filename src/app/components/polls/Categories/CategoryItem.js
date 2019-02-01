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
import { Helpers } from "app/utils";
import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = props => {
  const { categories, question, userHasAnswered } = props;
  const progressValue = userHasAnswered ? 100 : 0;
  const category = categories.find(
    _category => _category.id === question.categoryId
  );
  const buttonStatus = () => (userHasAnswered ? "COMPLETED" : "START");

  return (
    <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={question.id}>
      <Card elevation={1} className="flex flex-col min-h-256">
        <div
          className="flex items-center justify-between px-24 h-64"
          style={{
            background: category.color
          }}
        >
          <Button component={Link} to={`/questions/${category.value}`}>
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
            {buttonStatus(question)}
          </Button>
        </CardActions>
        <LinearProgress
          className="w-full"
          variant="determinate"
          value={progressValue}
          color="secondary"
        />
      </Card>
    </div>
  );
};

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

export default withStyles(styles, { withTheme: true })(CategoryItem);
