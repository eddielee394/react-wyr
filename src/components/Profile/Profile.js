import { FuseAnimate, FusePageSimple } from "@fuse";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import Fab from "@material-ui/core/es/Fab/Fab";
import { withStyles } from "@material-ui/core/styles";
import imgAvatarCarl from "assets/images/avatars/carl.jpg";
import imgAvatarCopeland from "assets/images/avatars/copeland.jpg";
import imgAvatarDanielle from "assets/images/avatars/danielle.jpg";
import imgAvatarEstes from "assets/images/avatars/estes.jpg";
import imgAvatarJane from "assets/images/avatars/jane.jpg";
import imgAvatarKatina from "assets/images/avatars/katina.jpg";
import imgAvatarMai from "assets/images/avatars/mai.jpg";
import imgAvatarOdessa from "assets/images/avatars/odessa.jpg";
import imgAvatarDefault from "assets/images/avatars/profile.jpg";
import imgAvatarTyson from "assets/images/avatars/tyson.jpg";
import imgAvatarVelazquez from "assets/images/avatars/velazquez.jpg";
import img9 from "assets/images/bg-patterns/9.png";
import imgBg3 from "assets/images/bg-patterns/bg-03.jpg";
import imgBg4 from "assets/images/bg-patterns/bg-04.jpg";
import imgBg12 from "assets/images/bg-patterns/bg-12.jpg";
import imgMuiDark from "assets/images/bg-patterns/dark-material-bg.jpg";
import * as UserActions from "auth/store/actions";
import classNames from "classnames";
import * as Actions from "components/polls/store/actions";
import reducer from "components/polls/store/reducers";
import ActivityTab from "components/Profile/tabs/ActivityTab";
import _ from "lodash";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import withReducer from "store/withReducer";

class Profile extends Component {
  state = {
    profileTab: 0,
    coverPhotos: [
      { id: "1", name: "Batman", url: imgMuiDark },
      { id: "2", name: "Woodlands", url: imgBg3 },
      { id: "3", name: "Mountains", url: imgBg4 },
      { id: "4", name: "Artsy", url: img9 },
      { id: "5", name: "Downtown", url: imgBg12 }
    ],
    avatars: [
      { id: "1", url: imgAvatarDefault },
      { id: "2", url: imgAvatarTyson },
      { id: "3", url: imgAvatarKatina },
      { id: "4", url: imgAvatarOdessa },
      { id: "5", url: imgAvatarDanielle },
      { id: "6", url: imgAvatarMai },
      { id: "7", url: imgAvatarCopeland },
      { id: "8", url: imgAvatarCarl },
      { id: "9", url: imgAvatarJane },
      { id: "10", url: imgAvatarVelazquez },
      { id: "11", url: imgAvatarEstes }
    ],
    activeCoverPhoto: "4",
    activeAvatar: "1",
    openAvatarDialog: false,
    openCoverPhotoDialog: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getQuestions();
  }

  getCoverPhoto() {
    const { coverPhotos, activeCoverPhoto } = this.state;
    const coverPhoto = _.find(coverPhotos, { id: activeCoverPhoto });
    return coverPhoto;
  }

  updateAvatar = avatarId => {
    const selectedAvatar = this.state.avatars.find(
      avatar => avatar.id === avatarId
    );

    const user = {
      ...this.props.user,
      data: {
        ...this.props.user.data,
        avatarURL: selectedAvatar.url
      }
    };
    this.props.updateUserData(user);
  };

  updateCoverPhoto = () => {
    const coverPhoto = this.getCoverPhoto();

    const user = {
      ...this.props.user,
      data: {
        ...this.props.user.data,
        settings: {
          ...this.props.user.data.settings,
          coverPhotoUrl: coverPhoto.url
        }
      }
    };

    this.props.updateUserData(user);
  };

  handleOpenEditDialog = event => {
    event.preventDefault();
    const { value } = event.currentTarget;

    if (value === "editAvatar") {
      this.setState({ openAvatarDialog: true });
    } else if (value === "editCoverPhoto") {
      this.setState({ openCoverPhotoDialog: true });
    }
  };

  handleCloseEditDialog = () => {
    this.setState({ openAvatarDialog: false });
    this.setState({ openCoverPhotoDialog: false });
  };

  handleUpdateCoverPhoto = event => {
    event.preventDefault();
    const { value } = event.currentTarget;

    this.setState({ activeCoverPhoto: value });
    this.updateCoverPhoto(value);
  };

  handleUpdateAvatar = avatarId => {
    this.setState({ activeAvatar: avatarId });
    this.updateAvatar(avatarId);
  };

  handleChange = (event, profileTab) => {
    this.setState({ profileTab });
  };

  render() {
    const { classes, user, users, questions, categories } = this.props;
    const {
      profileTab,
      coverPhotos,
      activeCoverPhoto,
      avatars,
      openCoverPhotoDialog,
      openAvatarDialog
    } = this.state;

    const coverPhoto = this.getCoverPhoto();

    const layoutHeaderStyles = {
      background: `url(${coverPhoto.url}) no-repeat center center`,
      backgroundSize: "cover"
    };

    const editCoverPhotoDialog = (
      <Dialog
        open={openCoverPhotoDialog}
        onClose={this.handleCloseEditDialog}
        aria-labelledby="simple-dialog-title"
      >
        <div className="cover-photo-dialog-container">
          <DialogTitle id="simple-dialog-title">Set Cover Photo</DialogTitle>
          <div className="cover-photo-select-container p-20">
            <GridList className="" spacing={8} cols={0}>
              {coverPhotos.map(photo => (
                <GridListTile
                  classes={{
                    root: "w-1 sm:w-1/2 ",
                    tile: "rounded-8"
                  }}
                  key={photo.id}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <GridListTileBar
                    title={photo.name}
                    actionIcon={
                      <IconButton
                        onClick={this.handleUpdateCoverPhoto}
                        value={photo.id}
                      >
                        {photo.id === activeCoverPhoto ? (
                          <Icon className="text-yellow opacity-75">star</Icon>
                        ) : (
                          <Icon className="text-white opacity-75">star</Icon>
                        )}
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </Dialog>
    );

    const editAvatarDialog = (
      <Dialog
        open={openAvatarDialog}
        onClose={this.handleCloseEditDialog}
        aria-labelledby="simple-dialog-title"
      >
        <div className="avatar-dialog-container">
          <DialogTitle id="simple-dialog-title">Set Avatar</DialogTitle>
          <div className="avatar-select-container">
            <List>
              <ListItem divider>
                <ListItemAvatar>
                  <Avatar
                    className={classes.avatar}
                    src={user.data.avatarURL}
                  />
                </ListItemAvatar>
                <ListItemText primary="Active" />
              </ListItem>
            </List>
            <List className="flex md:flex-wrap">
              {avatars.map(avatar => (
                <ListItem
                  className={classNames(classes.flexList)}
                  button
                  onClick={() => this.handleUpdateAvatar(avatar.id)}
                  key={avatar.id}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar} src={avatar.url} />
                  </ListItemAvatar>
                  <ListItemText primary="Select" />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Dialog>
    );

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
                <Fab
                  onClick={this.handleOpenEditDialog}
                  className={classNames(classes.editAvatarBtn)}
                  value="editAvatar"
                >
                  <Avatar className="w-96 h-96" src={user.data.avatarURL} />
                  <div
                    className={classNames(
                      classes.editAvatarWrapper,
                      "edit-avatar-wrapper text-white"
                    )}
                  >
                    <span
                      className={classNames(classes.editAvatar, "edit-avatar")}
                    >
                      Edit
                    </span>
                  </div>
                </Fab>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  {user.data.name ? user.data.name : user.data.displayName}
                </Typography>
              </FuseAnimate>
            </div>

            <div className="flex items-center justify-end">
              <Button
                className="normal-case"
                variant="contained"
                color="primary"
                aria-label="Send Message"
                onClick={this.handleOpenEditDialog}
                value="editCoverPhoto"
              >
                Edit Cover Photo
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
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            <ActivityTab
              questions={questions}
              categories={categories}
              user={user}
              users={users}
            />
            {editCoverPhotoDialog}
            {editAvatarDialog}
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
      updateQuestion: Actions.updateQuestion,
      updateUserData: UserActions.updateUserData
    },
    dispatch
  );
}

function mapStateToProps({ polls, auth }) {
  return {
    questions: polls.questions.data,
    categories: polls.categories.data,
    user: auth.user,
    users: auth.users
  };
}

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
  editAvatarBtn: {
    width: "96px",
    height: "96px",
    overflow: "hidden"
  },
  editAvatarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.50)"
  },
  editAvatar: {
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0
  },
  flexList: {
    flex: "1 1 50%"
  },
  tabsRoot: {
    height: 64,
    width: "100%"
  },
  tabRoot: {
    height: 64
  }
});

export default withReducer("polls", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Profile)
  )
);
