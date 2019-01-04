import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageSimple, FuseAnimate } from "@fuse";
import { Avatar, Button, Tab, Tabs, Typography } from "@material-ui/core";
import TimelineTab from "components/Profile/tabs/TimelineTab";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";
import imgArtsy from "assets/images/bg-patterns/9.png";
import imgDowntown from "assets/images/bg-patterns/bg-24.jpg";
import imgMountain from "assets/images/bg-patterns/bg-full_2.jpg";
import imgWoodlands from "assets/images/bg-patterns/bg-1920_2.jpg";
import imgBatman from "assets/images/bg-patterns/dark-material-bg.jpg";
import _ from "lodash";
import EditTab from "components/Profile/tabs/EditTab";

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
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
    profileTab: 0,
    coverPhotos: [
      { id: "1", name: "Batman", url: imgBatman },
      { id: "2", name: "Woodlands", url: imgWoodlands },
      { id: "3", name: "Mountains", url: imgMountain },
      { id: "4", name: "Artsy", url: imgArtsy },
      { id: "4", name: "Downtown", url: imgDowntown }
    ],
    activeCoverPhoto: "2"
  };

  componentDidMount() {
    this.props.getQuestions();
    this.props.getCategories();
  }

  getCoverPhoto() {
    const { coverPhotos, activeCoverPhoto } = this.state;
    console.log(coverPhotos.filter(photo => photo.id === activeCoverPhoto));
    const coverPhoto = _.filter(coverPhotos, { id: activeCoverPhoto });
    return coverPhoto[0];
  }

  handleUpdateCoverPhoto = id => {
    this.setState({ activeCoverPhoto: id });
  };

  handleChange = (event, profileTab) => {
    this.setState({ profileTab });
  };

  render() {
    const { classes, auth, questions } = this.props;
    const { profileTab } = this.state;
    const coverPhoto = this.getCoverPhoto();
    const layoutHeaderStyles = {
      background: `url(${coverPhoto.url}) no-repeat center center`,
      backgroundSize: "cover"
    };

    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          header: classes.layoutHeader,
          toolbar: classes.layoutToolbar
        }}
        header={
          <div
            className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end"
            style={layoutHeaderStyles}
          >
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar className="w-96 h-96" src={auth.user.data.avatarURL} />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  {auth.user.data.name}
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
            value={profileTab}
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
              label="Activity"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Edit Profile"
            />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            {profileTab === 0 && (
              <TimelineTab questions={questions} auth={auth} />
            )}
            {profileTab === 2 && <EditTab />}
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
