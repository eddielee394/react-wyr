import { TextFieldFormsy } from "@fuse";
import { CheckboxFormsy } from "@fuse/formsy";
import _ from "@lodash";
import {
  Button,
  Divider,
  Icon,
  InputAdornment,
  Typography,
  withStyles
} from "@material-ui/core";
import Fab from "@material-ui/core/es/Fab/Fab";
import * as Actions from "app/auth/store/actions";
import "app/utils/reactTable/react-table-defaults";
import classNames from "classnames";
import Formsy from "formsy-react";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import { bindActionCreators } from "redux";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    remember: true,
    canSubmit: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.error &&
      (this.props.login.error.email || this.props.login.error.password)
    ) {
      this.form.updateInputsWithError({
        ...this.props.login.error
      });

      this.props.login.error = null;
      this.disableButton();
    }

    if (this.props.user.role !== "guest") {
      const pathname =
        this.props.location.state && this.props.location.state.redirectUrl
          ? this.props.location.state.redirectUrl
          : "/questions";
      this.props.history.push({
        pathname
      });
    }
    return null;
  }

  form = React.createRef();

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    this.props.submitLogin(model);
  };

  setInputValue = value => {
    this.setState();
  };

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
    );
  };

  handleSetDemoCredentials = event => {
    const { username, password } = event;
    this.setState({ email: username, password: password });
  };

  render() {
    const { classes } = this.props;
    const { email, password, canSubmit, remember } = this.state;

    const demoCredentials = [
      {
        username: "burt_b",
        password: "password"
      },
      {
        username: "im_not_a_horse",
        password: "password"
      }
    ];

    const demoCredentialsCols = [
      {
        Header: "Username",
        accessor: "username",
        headerClassName: "text-left font-bold",
        className: "text-left",
        resizable: false
      },
      {
        Header: "Password",
        accessor: "password",
        headerClassName: "text-left font-bold",
        className: "text-left",
        resizable: false
      },
      {
        Header: "",
        className: "justify-center",
        width: 50,
        Cell: row => (
          <div className="flex items-center">
            <Fab
              size="small"
              className={classNames(
                classes.demoCredentialsIconButton,
                "bg-blue-dark"
              )}
            >
              <Icon className={classNames(classes.demoCredentialsIcon)}>
                account_circle
              </Icon>
            </Fab>
          </div>
        )
      }
    ];

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
            name="email"
            label="Username/Email"
            value={email}
            onChange={this.handleChange}
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
            value={password}
            onChange={this.handleChange}
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
                    vpn_key
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />
          <div className="flex items-center justify-between">
            <CheckboxFormsy
              name="remember"
              value={remember}
              onChange={this.handleChange}
              label="Remember me"
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16 normal-case"
            aria-label="LOG IN"
            disabled={!canSubmit}
            value="legacy"
          >
            Login
          </Button>
        </Formsy>

        <div className="demo-credentials-container pt-24">
          <Typography className="text-14 text-center font-900 py-8">
            Credentials
          </Typography>
          <Divider className="mb-16 w-256" />
          <ReactTable
            className="-striped -highlight border-0"
            getTrProps={(state, rowInfo, column) => {
              return {
                className: "cursor-pointer",
                onClick: (event, handleOriginal) => {
                  if (rowInfo) {
                    this.handleSetDemoCredentials(rowInfo.original);
                  }
                }
              };
            }}
            data={demoCredentials}
            columns={demoCredentialsCols}
            showPagination={false}
            sortable={false}
            filterable={false}
            minRows={0}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: Actions.submitLogin
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user
  };
}

const styles = () => ({
  root: {
    width: "100%"
  },
  demoCredentialsIconButton: {
    width: "30px",
    height: "30px",
    minHeight: "30px"
  },
  demoCredentialsIcon: {
    color: "#ffffff",
    "&:hover": {
      color: "#2779bd"
    }
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LoginForm)
  )
);
