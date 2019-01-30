import { FuseAnimateGroup } from "@fuse";
import _ from "@lodash";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { Helpers } from "app/utils";
import classNames from "classnames";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ActivityTab extends Component {
  state = {
    userQuestions: null
  };

  getRecentQuestions = () => {
    //todo move to redux
    const { questions } = this.props;
    const sortedQuestions = _.orderBy(questions, "timestamp", "desc");
    return sortedQuestions.slice(0, 3);
  };

  getPopularCategories = () => {
    //todo move to redux
    const { categories, questions } = this.props;

    const catIdCount = _.countBy(questions, "categoryId");

    const sortedCategories = _.chain(catIdCount)
      .map((count, id) => ({ id: id, count: count }))
      .orderBy("count", "desc")
      .slice(0, 3)
      .map(catId => _.find(categories, { id: catId.id }))
      .value();

    return sortedCategories;
  };

  getCategoryQuestionsCount = categoryId => {
    const { questions } = this.props;
    const catIdCount = _.countBy(questions, "categoryId");
    const questionCount = catIdCount[categoryId];

    return questionCount;
  };

  render() {
    const { classes, categories, users } = this.props;
    const recentQuestions = this.getRecentQuestions();
    const popularCategories = this.getPopularCategories();

    return (
      <div className={classNames(classes.root, "md:flex justify-center")}>
        <div className="flex flex-col flex-1 max-w-2xl md:pr-32">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <h1>My Questions List</h1>
          </FuseAnimateGroup>
        </div>

        <div className="flex flex-col md:w-320">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <Card className="w-full mb-16">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1"
                  >
                    Recently Posted
                  </Typography>
                  <Button
                    className="normal-case"
                    color="inherit"
                    size="small"
                    component={Link}
                    to={"/questions"}
                  >
                    View All
                  </Button>
                </Toolbar>
              </AppBar>

              <CardContent className="p-0">
                <List className="p-0">
                  {recentQuestions &&
                    recentQuestions.map(question => {
                      const category = categories.find(
                        _category => _category.id === question.categoryId
                      );
                      return (
                        <ListItem key={question.id}>
                          <Avatar
                            src={users[question.author.id].data.avatarURL}
                            alt={question.title}
                          >
                            {question.title}
                          </Avatar>
                          <ListItemText
                            primary={
                              <div className="">
                                <Typography
                                  className="inline font-medium"
                                  color="primary"
                                  paragraph={false}
                                >
                                  {question.title}
                                </Typography>

                                <Typography
                                  className="inline ml-4"
                                  paragraph={false}
                                >
                                  | {category.label}
                                </Typography>
                              </div>
                            }
                            secondary={Helpers.formatDate(question.timestamp)}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              component={Link}
                              to={`/questions/${category.value}/${question.id}`}
                            >
                              <Icon>open_in_new</Icon>
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
              </CardContent>
            </Card>
            <Card className="w-full mb-16">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1"
                  >
                    Popular Categories
                  </Typography>
                  <Button
                    className="normal-case"
                    color="inherit"
                    size="small"
                    component={Link}
                    to={"/questions"}
                  >
                    View All
                  </Button>
                </Toolbar>
              </AppBar>

              <CardContent className="p-0">
                <List className="p-0">
                  {popularCategories &&
                    popularCategories.map(category => {
                      return (
                        <ListItem key={category.id}>
                          <Avatar
                            alt={category.title}
                            style={{ backgroundColor: category.color }}
                          />
                          <ListItemText
                            primary={
                              <div className="">
                                <Typography
                                  className="inline font-medium"
                                  color="primary"
                                  paragraph={false}
                                >
                                  {category.label}
                                </Typography>
                              </div>
                            }
                            secondary={`Questions Posted: ${this.getCategoryQuestionsCount(
                              category.id
                            )} `}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              component={Link}
                              to={`/questions/${category.value}`}
                            >
                              <Icon>open_in_new</Icon>
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
              </CardContent>
            </Card>
          </FuseAnimateGroup>
        </div>
      </div>
    );
  }
}
const styles = () => ({
  root: {}
});
export default withStyles(styles, { withTheme: true })(ActivityTab);
