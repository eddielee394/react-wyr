import { SelectFormsy, TextFieldFormsy } from "@fuse";
import { Button, MenuItem, Typography, withStyles } from "@material-ui/core";
import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import Formsy from "formsy-react";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";

class QuestionAdd extends Component {
  state = {
    title: "",
    answerOneText: "",
    answerTwoText: "",
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

  resetForm = () => {
    this.form.reset();
  };

  onSubmit = model => {
    this.props.storeQuestion(model);
    this.resetForm();
  };

  render() {
    const { categories } = this.props;
    const { canSubmit, title, answerOneText, answerTwoText } = this.state;

    const categorySelectElement = (
      <SelectFormsy
        name="category"
        label="Category *"
        value={"0"}
        onChange={this.handleSetCategoryFilter}
        variant="outlined"
        className="my-16"
        validations={{ notEquals: (values, value) => value !== "0" }}
        validationError="Category is required"
        required
      >
        <MenuItem value="0" key="0">
          Select Category
        </MenuItem>
        {categories.map(category => (
          <MenuItem value={category.id} key={category.id}>
            {category.label}
          </MenuItem>
        ))}
      </SelectFormsy>
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
          <TextFieldFormsy
            className="my-16"
            label="Title"
            autoFocus
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            variant="outlined"
            required
            fullWidth
          />

          {categorySelectElement}

          <TextFieldFormsy
            className="my-16"
            label="Answer One"
            id="answerOneText"
            name="answerOneText"
            value={answerOneText}
            onChange={this.handleChange}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            required
          />
          <TextFieldFormsy
            className="my-16"
            label="Answer Two"
            id="answerTwoText"
            name="answerTwoText"
            value={answerTwoText}
            onChange={this.handleChange}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mx-auto my-16"
            aria-label="Submit"
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
      getCategories: Actions.getCategories,
      storeQuestion: Actions.storeQuestion
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
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(QuestionAdd)
  )
);
