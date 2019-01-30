import imgLogo from "assets/images/logos/logo.png";
import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div id="fuse-splash-screen">
      <div className="center">
        <div className="logo">
          <img width="200" src={imgLogo} alt="logo" />
        </div>

        <div className="spinner-wrapper">
          <RingLoader color={"#039be5"} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
