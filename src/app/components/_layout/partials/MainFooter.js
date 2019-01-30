import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";

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

const styles = () => ({
  root: {}
});

export default withStyles(styles, { withTheme: true })(MainFooter);
