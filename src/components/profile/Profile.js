import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageSimple, FuseAnimate } from "@fuse";
import { Avatar, Button, Tab, Tabs, Typography } from "@material-ui/core";
import TimelineTab from "components/profile/tabs/TimelineTab";
import PhotosVideosTab from "components/profile/tabs/PhotosVideosTab";
import AboutTab from "components/profile/tabs/AboutTab";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: "cover",
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      height: 240,
      minHeight: 240
    }
  },
  tabsRoot: {
    height: 64,
    width: "100%"
  },
  tabRoot: {
    height: 64
  }
});

class Profile extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.getQuestions();
    this.props.getCategories();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, auth, questions } = this.props;
    const { value } = this.state;

    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          header: classes.layoutHeader,
          toolbar: classes.layoutToolbar
        }}
        header={
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar className="w-96 h-96" src={auth.user.data.avatarURL} />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  John Doe
                </Typography>
              </FuseAnimate>
            </div>

            <div className="flex items-center justify-end">
              <Button
                className="mr-8 normal-case"
                variant="contained"
                color="secondary"
                aria-label="Follow"
              >
                Follow
              </Button>
              <Button
                className="normal-case"
                variant="contained"
                color="primary"
                aria-label="Send Message"
              >
                Send Message
              </Button>
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            scrollable
            scrollButtons="auto"
            classes={{
              root: classes.tabsRoot
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Timeline"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="About"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Photos & Videos"
            />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {value === 0 && <TimelineTab questions={questions} auth={auth} />}
            {value === 1 && <AboutTab />}
            {value === 2 && <PhotosVideosTab />}
          </div>
        }
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuestions: Actions.getQuestions,
      getCategories: Actions.getCategories,
      updateQuestion: Actions.updateQuestion
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }) {
  return {
    questions: polls.questions.data,
    categories: polls.questions.categories,
    auth
  };
}

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(mapStateToProps)(
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(Profile)
      )
    )
  )
);
