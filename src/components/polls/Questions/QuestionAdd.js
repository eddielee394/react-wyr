import reducer from "components/polls/store/reducers";
import React, { Component } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Select,
  Typography,
  withStyles
} from "@material-ui/core";
import Formsy from "formsy-react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";
import * as Actions from "components/polls/store/actions";

class QuestionAdd extends Component {
  state = {
    title: "",
    answerOne: "",
    answerTwo: "",
    category: "",
    canSubmit: false
  };

  componentDidMount() {
    this.props.getCategories();
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    console.info("submit", model);
  };

  handleSetCategorySelect = event => {
    const categoryId = event.target.value;
    let filterUrl = { categoryId: categoryId };

    if (!categoryId || categoryId === "0") {
      filterUrl = { categoryId: undefined };
    }

    this.updateUrlQuery(filterUrl);

    return this.props.setCategoryFilter(event);
  };

  render() {
    const { categorySelect, categories } = this.props;
    const { canSubmit } = this.state;
    const categorySelectElement = (
      <FormControl className="flex w-full mb-24" variant="outlined">
        <InputLabel htmlFor="category-label-placeholder">Category</InputLabel>
        <Select
          value={categorySelect}
          onChange={this.handleSetCategoryFilter}
          input={
            <OutlinedInput
              labelWidth={"category".length * 9}
              name="category"
              id="category-label-placeholder"
            />
          }
          required
        >
          {categories.map(category => (
            <MenuItem value={category.id} key={category.id}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    return (
      <div className="max-w-sm">
        <Typography className="h2 mb-24">Submit Question</Typography>
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref={form => (this.form = form)}
          className="flex flex-col justify-center"
        >
          <TextField
            className="mb-24"
            label="Title"
            autoFocus
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            variant="outlined"
            required
            fullWidth
          />

          {categorySelectElement}

          <TextField
            className="mb-24"
            label="Answer One"
            id="answerOne"
            name="answerOne"
            value={this.state.answerOne}
            onChange={this.handleChange}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
          />
          <TextField
            className="mb-24"
            label="Answer Two"
            id="answerTwo"
            name="answerTwo"
            value={this.state.answerTwo}
            onChange={this.handleChange}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mx-auto my-16"
            aria-label="LOG IN"
            disabled={!canSubmit}
          >
            Can submit
          </Button>
        </Formsy>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategories: Actions.getCategories
    },
    dispatch
  );
}
function mapStateToProps({ polls }) {
  return {
    categories: polls.categories.data
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
      )(QuestionAdd)
    )
  )
);
