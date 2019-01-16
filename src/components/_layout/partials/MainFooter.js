import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialLinks from "components/_layout/SocialLinks/SocialLinks";
import React from "react";
import { FuseAnimateGroup } from "@fuse";
import { withStyles } from "@material-ui/core/styles/index";
import { Button, Icon, IconButton, Tooltip } from "@material-ui/core";
import classNames from "classnames";
import lms_logo from "assets/images/logos/lms_logo_icon_primary_icon.png";
import react_logo from "assets/images/logos/react_logo.svg";
const styles = theme => ({
  root: {}
});

function MainFooter({ classes }) {
  return (
    <div className={classNames(classes.root, "flex flex-1 items-center px-24")}>
      <div className="flex flex-1">
        <Button
          component="a"
          href="https://github.com/eddielee394/react-wyr"
          target="_blank"
          rel="noreferrer noopener"
          role="button"
          className="normal-case"
          variant="contained"
          color="secondary"
        >
          <FontAwesomeIcon icon={["fab", "github"]} className="text-16 mr-4" />
          <span>View Source Code</span>
        </Button>
      </div>
      <div>
        <SocialLinks />
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(MainFooter);
