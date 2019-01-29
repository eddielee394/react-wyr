import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FuseAuthorization, FuseLayout, FuseTheme } from "@fuse";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import "assets/sass/App.scss";
import {
  Loader,
  MainFooter,
  MainNavbarContent,
  MainNavbarHeader,
  MainToolbar,
  QuickPanel,
  SettingsPanel
} from "components/_layout";
import { create } from "jss";
import jssExtend from "jss-extend";
import React from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { Auth } from "./auth";
import { routes } from "./config/routesConfig";
import store from "store";
import history from "./utils/history";

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
                contentWrapper={<SettingsPanel />}
              />
            </FuseTheme>
          </FuseAuthorization>
        </Router>
      </Auth>
    </Provider>
  </JssProvider>,
  document.getElementById("root")
);
