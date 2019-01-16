import { FuseAnimateGroup } from "@fuse";
import React from "react";
import SocialLink from "./SocialLink";

const SocialLinks = () => {
  const socialUrls = [
    { name: "portfolio", url: "https://www.lamplightsolutions.net" },
    { name: "youtube", url: null },
    { name: "vimeo", url: null },
    { name: "instagram", url: null },
    { name: "linkedin", url: "https://www.linkedin.com/in/eddie-padin" },
    { name: "facebook", url: null },
    { name: "twitter", url: "https://twitter.com/xerotrade" },
    {
      name: "stack-overflow",
      url: "https://stackoverflow.com/story/eddielee394"
    },
    { name: "github", url: "https://github.com/eddielee394" },
    { name: "react", url: "https://reactjs.org" }
  ];

  const showSocialUrls = socialUrls.map(
    socialUrl =>
      //if social url is not null, then render the component
      socialUrl.url && <SocialLink socialUrl={socialUrl} key={socialUrl.name} />
  );

  return (
    <FuseAnimateGroup
      enter={{
        animation: "transition.expandIn"
      }}
      className="hidden sm:flex items-center"
    >
      {showSocialUrls}
    </FuseAnimateGroup>
  );
};

export default SocialLinks;
