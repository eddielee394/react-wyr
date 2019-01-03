import React from "react";
import { createDevTools } from "redux-devtools";
import DockMonitor from "redux-devtools-dock-monitor";
import Inspector from "redux-devtools-inspector";
import LogMonitor from "redux-devtools-log-monitor";
import TestGenerator from "redux-devtools-test-generator";
import mochaTemplate from "redux-devtools-test-generator/lib/redux/mocha"; // If using default tests.
import SliderMonitor from "redux-slider-monitor"; // eslint-disable-line

const testComponent = props => (
  <TestGenerator
    expect={mochaTemplate.expect}
    wrap={mochaTemplate.wrap}
    {...props}
  />
);

export default createDevTools(
  <Inspector
    theme="nicinabox"
    supportImmutable
    invertTheme={false}
    tabs={defaultTabs => [
      ...defaultTabs,
      { name: "Tests", component: testComponent }
    ]}
  />
);
