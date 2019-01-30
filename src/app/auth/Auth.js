import * as Actions from "app/store/actions";
import jwtService from "app/utils/jwtService";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "app/auth/store/actions";

class Auth extends Component {
  /*eslint-disable-next-line no-useless-constructor*/
  constructor(props) {
    super(props);

    this.props.getAllUsers();

    this.jwtCheck();
  }

  jwtCheck = () => {
    jwtService.on("onAutoLogin", () => {
      /**
       * Sign in and retrieve user data from Api
       */
      jwtService
        .signInWithToken()
        .then(user => {
          this.props.setUserData(user);
        })
        .catch(error => {
          this.props.showMessage({ message: error });
        });
    });

    jwtService.on("onAutoLogout", message => {
      if (message) {
        this.props.showMessage({ message });
      }
      this.props.logout();
    });

    jwtService.init();
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      getAllUsers: userActions.getAllUsers,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Auth);
