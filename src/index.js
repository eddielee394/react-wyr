import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "assets/sass/App.scss";
import jssExtend from "jss-extend";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { routes } from "./config/routesConfig";
import history from "./utils/history";
import store from "./store";
import { Auth } from "./auth";
import { FuseAuthorization, FuseTheme, FuseLayout } from "@fuse";
import {
  MainFooter,
  MainNavbarContent,
  MainNavbarHeader,
  MainToolbar,
  QuickPanel
} from "components/_layout";

library.add(fas, far, fab);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById("jss-insertion-point");
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store}>
      <Auth>
        <Router history={history}>
          <FuseAuthorization routes={routes}>
            <FuseTheme>
              <FuseLayout
                routes={routes}
                toolbar={<MainToolbar />}
                navbarHeader={<MainNavbarHeader />}
                navbarContent={<MainNavbarContent />}
                footer={<MainFooter />}
                rightSidePanel={
                  <React.Fragment>
                    <QuickPanel />
                  </React.Fragment>
                }
              />
            </FuseTheme>
          </FuseAuthorization>
        </Router>
      </Auth>
    </Provider>
  </JssProvider>,
  document.getElementById("root")
);
