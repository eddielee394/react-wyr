import { FuseAnimate, FuseAnimateGroup, FuseUtils } from "@fuse";
import {
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import { CategoryItem } from "components/polls/Categories";
import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import queryString from "query-string";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getQuestions();
    this.initFilters();
  }

  updateUrlQuery = query => {
    return this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify(
        Object.assign({}, queryString.parse(this.props.location.search), query)
      )
    });
  };

  initFilters = () => {
    this.initCategoryFilter();
    this.initStatusFilter();
  };

  initCategoryFilter = () => {
    const filterQuery = queryString.parse(this.props.location.search);
    const categoryId = filterQuery.categoryId;

    if (filterQuery.categoryId) {
      return this.props.setCategoryFilter({ target: { value: categoryId } });
    }

    return false;
  };

  handleSetCategoryFilter = event => {
    const categoryId = event.target.value;
    let filterUrl = { categoryId: categoryId };

    if (!categoryId || categoryId === "0") {
      filterUrl = { categoryId: undefined };
    }

    this.updateUrlQuery(filterUrl);

    return this.props.setCategoryFilter(event);
  };

  initStatusFilter = () => {
    const filterQuery = queryString.parse(this.props.location.search);
    const status = filterQuery.status;

    if (filterQuery.status) {
      return this.props.setStatusFilter({ target: { value: status } });
    }

    return false;
  };

  handleSetStatusFilter = event => {
    const status = event.target.value;
    let filterUrl = { status: status };

    if (!status || status === "0") {
      filterUrl = { status: undefined };
    }

    this.updateUrlQuery(filterUrl);

    return this.props.setStatusFilter(event);
  };

  searchFilterResults = (data, searchText) => {
    if (searchText.length === 0) {
      return data;
    }

    return FuseUtils.filterArrayByString(data, searchText);
  };

  userHasAnswered = questionId => {
    const { authUser } = this.props;

    return Object.keys(authUser.data.answers).includes(questionId);
  };

  render() {
    const {
      classes,
      setSearchText,
      searchText,
      categories,
      categoryFilter,
      statusFilter,
      questions
    } = this.props;

    const filteredQuestions = this.searchFilterResults(questions, searchText);

    const showQuestions =
      filteredQuestions.length === 0 ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            No questions match your search
          </Typography>
        </div>
      ) : (
        filteredQuestions.map(question => {
          const category = categories.find(
            _category => _category.id === question.categoryId
          );
          return (
            <CategoryItem
              category={category}
              question={question}
              userHasAnswered={this.userHasAnswered(question.id)}
              key={question.id}
            />
          );
        })
      );

    const statusFilterElement = (
      <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
        <InputLabel htmlFor="status-label-placeholder">Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={this.handleSetStatusFilter}
          input={
            <OutlinedInput
              labelWidth={"status".length * 9}
              name="status"
              id="status-label-placeholder"
            />
          }
        >
          <MenuItem value={"0"} key="all">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"1"} key="complete">
            Complete
          </MenuItem>
          <MenuItem value={"2"} key="incomplete">
            Incomplete
          </MenuItem>
        </Select>
      </FormControl>
    );

    const categoryFilterElement = (
      <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
        <InputLabel htmlFor="category-label-placeholder">Category</InputLabel>
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
    );

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
            {statusFilterElement}
            {categoryFilterElement}
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
      setStatusFilter: Actions.setStatusFilter,
      setSearchText: Actions.setSearchText
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }, props) {
  //todo move this logic to redux store
  const categories = polls.categories.data;
  const authUser = auth.user;
  const { statusFilter, categoryFilter, searchText } = polls.filters;
  let questions = polls.questions.data;

  const category = categories.filter(
    _category => _category.id === categoryFilter
  );

  if (category.length > 0 && category.id !== "0") {
    questions = questions.filter(
      question => question.categoryId === categoryFilter
    );
  }

  if (statusFilter === "1") {
    questions = questions.filter(question =>
      Object.keys(authUser.data.answers).includes(question.id)
    );
  } else if (statusFilter === "2") {
    questions = questions.filter(
      question => !Object.keys(authUser.data.answers).includes(question.id)
    );
  }

  return {
    questions: questions,
    categories: categories,
    categoryFilter: categoryFilter,
    statusFilter: statusFilter,
    authUser: authUser,
    searchText: searchText
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
