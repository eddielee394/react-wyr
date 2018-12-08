import RegisterForm from "components/_pages/auth/Register/forms/RegisterForm";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles/index";
import { Card, CardContent, Typography } from "@material-ui/core";
import classNames from "classnames";
import { FuseAnimate } from "@fuse";

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: "cover"
  },
  intro: {
    color: "#ffffff"
  },
  card: {
    width: "100%",
    maxWidth: 400
  }
});

class RegisterPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div
        className={classNames(
          classes.root,
          "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0"
        )}
      >
        <div
          className={classNames(
            classes.intro,
            "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left"
          )}
        >
          <FuseAnimate animation="transition.expandIn">
            <img
              className="w-128 mb-32"
              src="assets/images/logos/fuse.svg"
              alt="logo"
            />
          </FuseAnimate>

          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Typography variant="h3" color="inherit" className="font-light">
              Welcome to the FUSE!
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={400}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="max-w-512 mt-16"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ullamcorper nisl erat, vel convallis elit fermentum pellentesque.
              Sed mollis velit facilisis facilisis.
            </Typography>
          </FuseAnimate>
        </div>

        <FuseAnimate animation={{ translateX: [0, "100%"] }}>
          <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <Typography variant="h6" className="md:w-full mb-32">
                CREATE AN ACCOUNT
              </Typography>

              <RegisterForm />

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Already have an account?</span>
                <Link className="font-medium" to="/login">
                  Login
                </Link>
                <Link className="font-medium mt-8" to="/">
                  Back to Dashboard
                </Link>
              </div>

              <div className="flex flex-col items-center" />
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps)(RegisterPage))
);
