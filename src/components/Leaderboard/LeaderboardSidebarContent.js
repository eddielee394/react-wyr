import { FuseAnimate } from "@fuse";
import _ from "@lodash";
import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

class LeaderboardSidebarContent extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div className="p-16 lg:p-24 lg:pr-4">
        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
          <Paper elevation={1} className="rounded-8">
            <div className="p-24 flex items-center">
              <Avatar
                className="mr-12"
                alt={user.data.displayName}
                src={user.data.avatarURL}
              />
              <Typography>{user.data.displayName}</Typography>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={NavLink}
                to={"/leaderboard"}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  people
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="All users"
                  disableTypography={true}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={"/leaderboard/friends"}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  restore
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="Friends"
                  disableTypography={true}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={"/leaderboard/favorites"}
                activeClassName="active"
                className={classes.listItem}
              >
                <Icon className="list-item-icon text-16" color="action">
                  star
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="Favorites"
                  disableTypography={true}
                />
              </ListItem>
              <Divider />
              <ListSubheader>
                <Typography variant="Subheading" className="pt-16" gutterBottom>
                  My Stats
                </Typography>
              </ListSubheader>
              <ListItem activeClassName="active" className={classes.listItem}>
                <Icon className="list-item-icon text-16" color="action">
                  assignment_turned_in
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="Completed"
                  disableTypography={true}
                />
                <ListItemAvatar>
                  <Avatar className={classes.listItemAvatar}>
                    {user.data.questionsAnswered}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <ListItem activeClassName="active" className={classes.listItem}>
                <Icon className="list-item-icon text-16" color="action">
                  ballot
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="Asked"
                  disableTypography={true}
                />
                <ListItemAvatar>
                  <Avatar className={classes.listItemAvatar}>
                    {user.data.questionsAsked}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <ListItem activeClassName="active" className={classes.listItem}>
                <Icon className="list-item-icon text-16" color="action">
                  whatshot
                </Icon>
                <ListItemText
                  className="truncate pr-0"
                  primary="Current Rank"
                  disableTypography={true}
                />
                <ListItemAvatar>
                  <Avatar className={classes.listItemAvatar}>
                    {user.data.globalRank}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            </List>
          </Paper>
        </FuseAnimate>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ leaderboard, auth }) {
  const user = _.find(leaderboard.leaderboard.entities, { id: auth.user.id });

  return {
    user: user
  };
}
const styles = theme => ({
  listItem: {
    color: "inherit!important",
    textDecoration: "none!important",
    height: 40,
    width: "calc(100% - 16px)",
    borderRadius: "0 20px 20px 0",
    paddingLeft: 24,
    paddingRight: 12,
    "&.active": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + "!important",
      pointerEvents: "none",
      "& .list-item-icon": {
        color: "inherit"
      }
    }
  },
  listItemAvatar: {
    margin: 5,
    width: 25,
    height: 25,
    fontSize: "1.5rem",
    backgroundColor: theme.palette.primary.main
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LeaderboardSidebarContent)
  )
);
