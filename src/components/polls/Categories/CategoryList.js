import React, { Component } from "react";
import {
  withStyles,
  Button,
  Card,
  CardContent,
  OutlinedInput,
  Icon,
  TextField,
  Typography,
  CardActions,
  Divider,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  LinearProgress
} from "@material-ui/core";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import withReducer from "store/withReducer";
import reducer from "../store/reducers";
import { bindActionCreators } from "redux";
import * as Actions from "../store/actions";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import _ from "@lodash";
import { Link } from "react-router-dom";

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

class CategoryList extends Component {
  state = {
    data: this.props.questions,
    categories: this.props.categories
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.props.questions, prevProps.questions) ||
      !_.isEqual(this.props.searchText, prevProps.searchText) ||
      !_.isEqual(this.props.categoryFilter, prevProps.categoryFilter)
    ) {
      const data = this.getFilteredArray(
        this.props.questions,
        this.props.searchText,
        this.props.categoryFilter
      );
      this.setState({ data });
    }
  }

  getFilteredArray = (data, searchText, categoryFilter) => {
    if (searchText.length === 0 && categoryFilter === 0) {
      return data;
    }

    return _.filter(data, item => {
      if (categoryFilter !== 0 && item.categoryId !== categoryFilter) {
        return false;
      }
      let searchTextResults =
        item.optionOne.text.toLowerCase().includes(searchText.toLowerCase()) ||
        item.optionTwo.text.toLowerCase().includes(searchText.toLowerCase());

      return searchTextResults;
    });
  };

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
    const {
      classes,
      setSearchText,
      searchText,
      categories,
      categoryFilter,
      setCategoryFilter,
      theme
    } = this.props;

    const { data } = this.state;

    return (
      <div className={classNames(classes.root)}>
        <div
          className={classNames(
            classes.header,
            "relative overflow-hidden flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288"
          )}
        >
          <FuseAnimate
            animation="transition.slideUpIn"
            duration={400}
            delay={100}
          >
            <Typography
              color="inherit"
              className="text-24 sm:text-40 font-light"
            >
              WELCOME TO ACADEMY
            </Typography>
          </FuseAnimate>

          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="mt-8 sm:mt-16 mx-auto max-w-512"
            >
              <span className="opacity-75">
                Our questions will step you through the process of building a
                small application, or adding a new feature to an existing
                application.
              </span>
            </Typography>
          </FuseAnimate>

          <Icon className={classes.headerIcon}>school</Icon>
        </div>
        <div
          className={classNames(
            classes.content,
            "max-w-2xl w-full mx-auto px-16 sm:px-24 py-24"
          )}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between py-24">
            <TextField
              label="Search for a question"
              placeholder="Enter a keyword..."
              className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
              value={searchText}
              inputProps={{
                "aria-label": "Search"
              }}
              onChange={setSearchText}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl
              className="flex w-full sm:w-320 mx-16"
              variant="outlined"
            >
              <InputLabel htmlFor="category-label-placeholder">
                Category
              </InputLabel>
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                input={
                  <OutlinedInput
                    labelWidth={"category".length * 9}
                    name="category"
                    id="category-label-placeholder"
                  />
                }
              >
                <MenuItem value={0}>
                  <em>All</em>
                </MenuItem>

                {categories.map(category => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
            className="flex flex-wrap py-24"
          >
            {data.map(question => {
              const category = categories.find(
                _cat => _cat.id === question.categoryId
              );
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
                      <Typography
                        className="font-medium truncate"
                        color="inherit"
                      >
                        {category.label}
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
            })}
          </FuseAnimateGroup>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategories: Actions.getCategories,
      getQuestions: Actions.getQuestions,
      setCategoryFilter: Actions.setCategoryFilter,
      setSearchText: Actions.setQuestionsSearchText
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }) {
  return {
    questions: polls.questions.data,
    searchText: polls.questions.searchText,
    categories: polls.questions.categories,
    categoryFilter: polls.questions.categoryFilter,
    authUser: auth.user
  };
}

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(CategoryList)
  )
);
