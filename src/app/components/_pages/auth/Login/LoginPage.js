import { FuseAnimate } from "@fuse";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import SocialLinks from "app/components/_layout/SocialLinks/SocialLinks";
import LoginForm from "./LoginForm";
import dark_material_bg from "assets/images/bg-patterns/dark-material-bg.jpg";
import logo from "assets/images/logos/logo.png";
import classNames from "classnames";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class LoginPage extends Component {
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
            "flex flex-col flex-no-grow p-16 text-center md:p-128 md:flex-row md:items-center md:flex-no-shrink md:flex-1 md:text-left"
          )}
        >
          <FuseAnimate animation="transition.expandIn">
            <div className="logo-container">
              <img className="md:mr-20 mb-32" src={logo} alt="logo" />
            </div>
          </FuseAnimate>

          <div className="flex flex-col">
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
              <Typography variant="h3" color="inherit" className="font-light">
                Ready To Get Started?
              </Typography>
            </FuseAnimate>

            <FuseAnimate delay={400}>
              <Typography
                variant="subtitle1"
                color="inherit"
                className="max-w-512 mt-16"
              >
                A prematurely optimized, over-engineered & unnecessarily
                complicated "Would You Rather" game built with ReactJS, Redux &
                a bunch of other stuff...
              </Typography>
            </FuseAnimate>
          </div>
        </div>

        <FuseAnimate animation={{ translateX: [0, "100%"] }}>
          <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <Typography variant="h6" className="text-center md:w-full mb-48">
                LOGIN TO YOUR ACCOUNT
              </Typography>

              <LoginForm />

              <div className="flex flex-col items-center justify-center pt-32">
                <span className="font-medium">Don't have an account?</span>
                <Link className="font-medium" to="/register">
                  Create an account
                </Link>
              </div>
              <div className="mt-48">
                <SocialLinks />
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    background: `url(${dark_material_bg}) no-repeat`,
    backgroundSize: "cover"
  },
  intro: {
    color: "#ffffff"
  },
  card: {
    width: "100%",
    maxWidth: 400
  },
  logoContainer: {
    marginRight: "auto",
    marginLeft: "auto"
  }
});

export default withStyles(styles, { withTheme: true })(withRouter(LoginPage));
