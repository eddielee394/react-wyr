import CategoryItem from "components/polls/Categories/CategoryItem";
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

class CategoryList extends Component {
  state = {
    // questions: {},
    // categories: this.props.categories
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
      const questions = this.getFilteredArray(
        this.props.questions,
        this.props.searchText,
        this.props.categoryFilter
      );
      this.setState({ questions });
    }
  }

  getFilteredArray = (questions, searchText, categoryFilter) => {
    if (searchText.length === 0 && categoryFilter === 0) {
      return questions;
    }

    return _.filter(questions, question => {
      if (categoryFilter !== 0 && question.question !== categoryFilter) {
        return false;
      }
      let searchTextResults =
        question.answers.answerOne.text
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        question.answers.answerTwo.text
          .toLowerCase()
          .includes(searchText.toLowerCase());

      return searchTextResults;
    });
  };

  render() {
    const {
      classes,
      setSearchText,
      searchText,
      categories,
      categoryFilter,
      setCategoryFilter,
      categoryIds,
      questionIds,
      questions,
      theme
    } = this.props;

    // const { questions } = this.state;

    // return <h1>Test</h1>;
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
              Would You Rather???
            </Typography>
          </FuseAnimate>

          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="mt-8 sm:mt-16 mx-auto max-w-512"
            >
              <span className="opacity-75">
                Select any of the questions below to get started!
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

                {categoryIds.map(category => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/*<FuseAnimateGroup*/}
          {/*enter={{*/}
          {/*animation: "transition.slideUpBigIn"*/}
          {/*}}*/}
          {/*className="flex flex-wrap py-24"*/}
          {/*>*/}
          {/*{questionIds.map(question => {*/}
          {/*const category = categories.find(*/}
          {/*_cat => _cat.id === question.category.id*/}
          {/*);*/}
          {/*return (*/}
          {/*<CategoryItem*/}
          {/*category={category}*/}
          {/*question={question}*/}
          {/*key={question.id}*/}
          {/*/>*/}
          {/*);*/}
          {/*})}*/}
          {/*</FuseAnimateGroup>*/}
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
  // let categories = Object.keys(polls.questions.categories);
  // const questions = Object.keys(polls.questions.data.entities.questions);
  const { entities } = polls;
  console.log(entities);

  return {
    // questions,
    // questionIds: polls.questions.data.result,
    searchText: polls.searchText,
    categories: polls.categories,
    categoryIds: ["1", "2"],
    categoryFilter: polls.categoryFilter,
    authUser: auth.user
  };
}

export default /*withReducer("polls", reducer)*/ withStyles(styles, {
  withTheme: true
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryList)
);
