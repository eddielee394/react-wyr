import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@material-ui/core";
import lms_logo from "assets/images/logos/lms_logo_icon_primary_icon.png";
import React from "react";

const SocialLink = props => {
  const { socialUrl } = props;

  const faIconName =
    socialUrl.name === "portfolio" ? "globe" : ["fab", socialUrl.name];

  const websiteLinkElement = (
    <img src={lms_logo} alt="Lamplight Marketing Solutions" width="32" />
  );

  const socialLinkElement = (
    <FontAwesomeIcon icon={faIconName} aria-hidden="true" />
  );

  const linkList =
    socialUrl.name === "portfolio" ? websiteLinkElement : socialLinkElement;
  return (
    <Tooltip title={socialUrl.name} placement="top">
      <IconButton
        className="px-4"
        component="a"
        href={socialUrl.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {linkList}
      </IconButton>
    </Tooltip>
  );
};

export default SocialLink;
