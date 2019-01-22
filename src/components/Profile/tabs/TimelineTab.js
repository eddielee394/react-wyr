import {FuseAnimateGroup} from "@fuse";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/index";
import classNames from "classnames";
import React, {Component} from "react";
import {Link} from "react-router-dom";

const styles = theme => ({
  root: {}
});

class TimelineTab extends Component {
  state = {
    activities: null,
    userQuestions: null
  };

  render() {
    const { classes, questions, auth } = this.props;
    const { activities } = this.state;

    return (
      <div className={classNames(classes.root, "md:flex max-w-2xl")}>
        <div className="flex flex-col flex-1 md:pr-32">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <div>
              <Card className="w-full overflow-hidden">
                <Input
                  className="p-16 w-full"
                  classes={{ root: "text-14" }}
                  placeholder="Write something.."
                  multiline
                  rows="6"
                  margin="none"
                  disableUnderline
                />
                <AppBar
                  className="card-footer flex flex-row border-t-1"
                  position="static"
                  color="default"
                  elevation={0}
                >
                  <div className="flex-1 items-center">
                    <IconButton aria-label="Add photo">
                      <Icon>photo</Icon>
                    </IconButton>
                    <IconButton aria-label="Mention somebody">
                      <Icon>person</Icon>
                    </IconButton>
                    <IconButton aria-label="Add location">
                      <Icon>location_on</Icon>
                    </IconButton>
                  </div>

                  <div className="p-8">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      aria-label="question"
                    >
                      Post
                    </Button>
                  </div>
                </AppBar>
              </Card>

              <Divider className="my-32" />
            </div>

            {questions &&
              questions.map(question => (
                <Card className="mb-32 overflow-hidden" key={question.id}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="Recipe"
                        src={auth.users[question.userId]}
                      />
                    }
                    action={
                      <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                      </IconButton>
                    }
                    title={
                      <span>
                        <Typography
                          className="inline font-medium mr-4"
                          color="primary"
                          paragraph={false}
                        >
                          {question.userId}
                        </Typography>
                        {question.type === "question" &&
                          "questioned on your timeline"}
                        {question.type === "something" &&
                          "shared something with you"}
                        {question.type === "video" && "shared a video with you"}
                        {question.type === "article" &&
                          "shared an article with you"}
                      </span>
                    }
                    subheader={question.time}
                  />

                  <CardContent className="py-0">
                    {question.message && (
                      <Typography component="p" className="mb-16">
                        {question.message}
                      </Typography>
                    )}

                    {question.media && (
                      <img src={question.media.preview} alt="question" />
                    )}

                    {question.article && (
                      <div className="border-1">
                        <img
                          className="w-full border-b-1"
                          src={question.article.media.preview}
                          alt="article"
                        />
                        <div className="p-16">
                          <Typography variant="subtitle1">
                            {question.article.title}
                          </Typography>
                          <Typography variant="caption">
                            {question.article.subtitle}
                          </Typography>
                          <Typography className="mt-16">
                            {question.article.excerpt}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardActions className="" disableActionSpacing>
                    <Button size="small" aria-label="Add to favorites">
                      <Icon className="text-16 mr-8" color="action">
                        favorite
                      </Icon>
                      <Typography className="normal-case">Like</Typography>
                      <Typography className="normal-case ml-4">
                        ({question.like})
                      </Typography>
                    </Button>
                    <Button aria-label="Share">
                      <Icon className="text-16 mr-8" color="action">
                        share
                      </Icon>
                      <Typography className="normal-case">Share</Typography>
                      <Typography className="normal-case ml-4">
                        ({question.share})
                      </Typography>
                    </Button>
                  </CardActions>

                  <AppBar
                    className="card-footer flex flex-column p-16"
                    position="static"
                    color="default"
                    elevation={0}
                  >
                    {question.comments && question.comments.length > 0 && (
                      <div className="">
                        <div className="flex items-center">
                          <Typography>
                            {question.comments.length} comments
                          </Typography>
                          <Icon className="text-16 ml-4" color="action">
                            keyboard_arrow_down
                          </Icon>
                        </div>

                        <List>
                          {question.comments.map(comment => (
                            <div key={comment.id}>
                              <ListItem className="px-0">
                                <Avatar
                                  alt={comment.user.name}
                                  src={comment.user.avatar}
                                />
                                <ListItemText
                                  primary={
                                    <div>
                                      <Typography
                                        className="inline font-medium"
                                        color="default"
                                        paragraph={false}
                                      >
                                        {comment.user.name}
                                      </Typography>
                                      <Typography
                                        className="inline ml-4"
                                        variant="caption"
                                      >
                                        {comment.time}
                                      </Typography>
                                    </div>
                                  }
                                  secondary={comment.message}
                                />
                              </ListItem>
                              <div className="flex items-center ml-56 mb-8">
                                <Link to="#" className="mr-8">
                                  Reply
                                </Link>
                                <Icon className="text-14 cursor-pointer">
                                  flag
                                </Icon>
                              </div>
                            </div>
                          ))}
                        </List>
                      </div>
                    )}

                    <div className="flex flex-auto">
                      <Avatar src={auth.user.data.avatarURL} />
                      <div className="flex-1 pl-8">
                        <Paper elevation={0} className="w-full mb-16">
                          <Input
                            className="p-8 w-full border-1"
                            classes={{ root: "text-13" }}
                            placeholder="Add a comment.."
                            multiline
                            rows="6"
                            margin="none"
                            disableUnderline
                          />
                        </Paper>
                        <Button
                          className="normal-case"
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </AppBar>
                </Card>
              ))}
          </FuseAnimateGroup>
        </div>

        <div className="flex flex-col md:w-320">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <Card className="w-full">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1"
                  >
                    Latest Activity
                  </Typography>
                  <Button color="inherit" size="small">
                    See All
                  </Button>
                </Toolbar>
              </AppBar>
              <CardContent className="p-0">
                <List>
                  {activities &&
                    activities.map(activity => (
                      <ListItem key={activity.id} className="">
                        <Avatar
                          alt={activity.user.name}
                          src={activity.user.avatar}
                        />
                        <ListItemText
                          className="flex-1"
                          primary={
                            <div className="truncate">
                              <Typography
                                className="inline font-medium"
                                color="primary"
                                paragraph={false}
                              >
                                {activity.user.name}
                              </Typography>

                              <Typography
                                className="inline ml-4"
                                paragraph={false}
                              >
                                {activity.message}
                              </Typography>
                            </div>
                          }
                          secondary={activity.time}
                        />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </FuseAnimateGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TimelineTab);
