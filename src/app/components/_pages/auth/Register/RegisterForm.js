import { TextFieldFormsy } from "@fuse";
import { Button, Icon, InputAdornment, withStyles } from "@material-ui/core";
import * as Actions from "app/auth/store/actions";
import Formsy from "formsy-react";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

class RegisterForm extends Component {
  state = {
    canSubmit: false
  };

  form = React.createRef();

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    this.props.submitRegister(model);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.register.error &&
      (this.props.register.error.username ||
        this.props.register.error.password ||
        this.props.register.error.email)
    ) {
      this.form.updateInputsWithError({
        ...this.props.register.error
      });

      this.props.register.error = null;
      this.disableButton();
    }

    if (this.props.user.role !== "guest") {
      const pathname =
        this.props.location.state && this.props.location.state.redirectUrl
          ? this.props.location.state.redirectUrl
          : "/dashboard";
      this.props.history.push({
        pathname
      });
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const { canSubmit } = this.state;

    return (
      <div className={classes.root}>
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref={form => (this.form = form)}
          className="flex flex-col justify-center w-full"
        >
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="displayName"
            label="Display name"
            validations={{
              minLength: 4
            }}
            validationErrors={{
              minLength: "Min character length is 4"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    person
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="email"
            label="Email"
            validations="isEmail"
            validationErrors={{
              isEmail: "Please enter a valid email"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    email
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <TextFieldFormsy
            className="mb-16"
            type="password"
            name="password"
            label="Password"
            validations="equalsField:password-confirm"
            validationErrors={{
              equalsField: "Passwords do not match"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    vpn_key
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <TextFieldFormsy
            className="mb-16"
            type="password"
            name="password-confirm"
            label="Confirm Password"
            validations="equalsField:password"
            validationErrors={{
              equalsField: "Passwords do not match"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    vpn_key
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16 normal-case"
            aria-label="REGISTER"
            disabled={!canSubmit}
            value="legacy"
          >
            Register
          </Button>
        </Formsy>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitRegister: Actions.submitRegister
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    register: auth.register,
    user: auth.user
  };
}

const styles = () => ({
  root: {
    width: "100%"
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(RegisterForm)
  )
);
