import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FuseAuthorization, FuseLayout, FuseTheme } from "@fuse";
import { createGenerateClassName, jssPreset } from "@material-ui/core";
import { Auth } from "app/auth";
import {
  MainFooter,
  MainNavbarContent,
  MainNavbarHeader,
  MainToolbar,
  QuickPanel,
  SettingsPanel
} from "app/components/_layout";
import { routes } from "app/config/routesConfig";
import store from "app/store";
import history from "app/utils/history";
import { initDb } from "database/_DATA";
import { create } from "jss";
import jssExtend from "jss-extend";
import React from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

library.add(fas, far, fab);

initDb();

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById("jss-insertion-point");
const generateClassName = createGenerateClassName();

const App = () => {
  return (
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
    </JssProvider>
  );
};

export default App;
