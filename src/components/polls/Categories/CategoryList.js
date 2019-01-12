import { FuseUtils } from "@fuse";
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
import { withRouter } from "react-router-dom";
import withReducer from "store/withReducer";
import reducer from "components/polls/store/reducers";
import { bindActionCreators } from "redux";
import * as Actions from "components/polls/store/actions";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import _ from "@lodash";
import queryString from "query-string";

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getQuestions();
    this.initCategoryFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.props.questions, prevProps.questions) ||
      !_.isEqual(this.props.searchText, prevProps.searchText) ||
      !_.isEqual(this.props.categoryFilter, prevProps.categoryFilter)
    ) {
      this.initCategoryFilter();
    }
  }

  updateUrl = path => {
    if (!path) {
      return this.props.history.push(this.props.location.pathname);
    }

    return this.props.history.push(path);
  };

  initCategoryFilter = () => {
    const filterQuery = queryString.parse(this.props.location.search);
    const categoryId = parseInt(filterQuery.categoryId);
    if (filterQuery.categoryId) {
      return this.props.setCategoryFilter({ target: { value: categoryId } });
    }
    return false;
  };

  handleSetCategoryFilter = event => {
    const categoryId = event.target.value;

    if (!categoryId || categoryId === 0) {
      this.updateUrl();
      return this.props.setCategoryFilter(event);
    }
    const filterUrl = `/questions?categoryId=${categoryId}`;
    this.updateUrl(filterUrl);
    return this.props.setCategoryFilter(event);
  };

  searchFilterResults = (data, searchText) => {
    if (searchText.length === 0) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, searchText);
  };

  render() {
    const {
      classes,
      setSearchText,
      searchText,
      categories,
      categoryFilter,
      questions
    } = this.props;

    const filteredQuestions = this.searchFilterResults(questions, searchText);

    let showQuestions = {};
    if (filteredQuestions.length === 0) {
      showQuestions = (
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            No questions match your search
          </Typography>
        </div>
      );
    } else {
      showQuestions = filteredQuestions.map(question => {
        const category = categories.find(
          _category => _category.id === question.categoryId
        );
        return (
          <CategoryItem
            category={category}
            question={question}
            key={question.id}
          />
        );
      });
    }

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
                onChange={this.handleSetCategoryFilter}
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
            {showQuestions}
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
      setSearchText: Actions.setSearchText
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }, props) {
  const categories = polls.categories.data;
  let questions = polls.questions.data;

  const filterQuery = queryString.parse(props.location.search);
  const categoryFilterId = parseInt(filterQuery.categoryId);

  const category = categories.filter(
    _category => _category.id === categoryFilterId
  );

  if (category.length > 0 && category.id !== 0) {
    questions = questions.filter(
      question => question.categoryId === categoryFilterId
    );
  }

  return {
    questions: questions,
    categories: categories,
    categoryFilter: polls.filters.categoryFilter,
    authUser: auth.user,
    searchText: polls.filters.searchText
  };
}

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

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(CategoryList)
    )
  )
);
