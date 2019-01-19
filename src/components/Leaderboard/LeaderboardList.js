import { FuseAnimate, FuseUtils } from "@fuse";
import { Avatar, Icon, IconButton, withStyles } from "@material-ui/core";
import { blueGrey, brown, yellow } from "@material-ui/core/colors";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import "utils/reactTable/react-table-defaults";

class LeaderboardList extends Component {
  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(entities, searchText);
  };

  handleUserProfileRedirect = userId => {};

  avatarClass = value => {
    console.log(value === 1);
    if (value === 1) {
      return this.props.classes.goldAvatar;
    }
    if (value === 2) {
      return this.props.classes.silverAvatar;
    }
    if (value === 3) {
      return this.props.classes.bronzeAvatar;
    }
    return this.props.classes.avatar;
  };

  render() {
    const {
      user,
      users,
      searchText,
      toggleStarredContact,
      classes
    } = this.props;
    const data = this.getFilteredArray(users, searchText);

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
          className="-striped -highlight border-0"
          getTrProps={(state, rowInfo, column) => {
            return {
              className: "cursor-pointer",
              onClick: (e, handleOriginal) => {
                if (rowInfo) {
                  this.handleUserProfileRedirect(rowInfo.original);
                }
              }
            };
          }}
          data={data}
          columns={[
            {
              Header: "Global Rank",
              accessor: "data.globalRank",
              Cell: row => (
                <Avatar className={this.avatarClass(row.value)}>
                  {row.value}
                </Avatar>
              ),
              className: "justify-center",
              sortable: true,
              maxWidth: 85
            },
            {
              Header: "",
              accessor: "data.avatarURL",
              Cell: row => (
                <Avatar
                  className="mr-8"
                  alt={row.original.name}
                  src={row.value}
                />
              ),
              className: "justify-center",
              width: 64,
              sortable: false
            },
            {
              Header: "Username",
              accessor: "data.displayName",
              filterable: true,
              className: "font-bold"
            },
            {
              Header: "Questions Asked",
              accessor: "data.questionsAsked",
              filterable: true
            },
            {
              Header: "Questions Answered",
              accessor: "data.questionsAnswered",
              filterable: true
            },
            {
              Header: "",
              width: 128,
              Cell: row => (
                <div className="flex items-center">
                  <IconButton
                    onClick={ev => {
                      ev.stopPropagation();
                      toggleStarredContact(row.original.id);
                    }}
                  >
                    {user.starred && user.starred.includes(row.original.id) ? (
                      <Icon>star</Icon>
                    ) : (
                      <Icon>star_border</Icon>
                    )}
                  </IconButton>
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          defaultSorted={[{ id: "data.globalRank" }]}
          noDataText="No results found"
        />
      </FuseAnimate>
    );
  }
}

function mapStateToProps({ leaderboard, auth }) {
  return {
    users: leaderboard.leaderboard.entities,
    searchText: "",
    user: ""
  };
}

const styles = theme => ({
  avatar: {
    margin: 10
  },
  goldAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: yellow["A700"]
  },
  silverAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: blueGrey[500]
  },
  bronzeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: brown[500]
  }
});

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps)(LeaderboardList))
);
