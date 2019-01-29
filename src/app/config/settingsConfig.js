const settingsConfig = {
  layout: {
    style: "layout2",
    config: {
      scroll: "content",
      navbar: {
        display: true,
        folded: false,
        position: "left"
      },
      toolbar: {
        display: false,
        style: "fixed",
        position: "below"
      },
      footer: {
        display: true,
        style: "fixed",
        position: "below"
      },
      leftSidePanel: {
        display: true
      },
      rightSidePanel: {
        display: true
      },
      mode: "fullwidth"
    }
  },
  customScrollbars: true,
  theme: {
    main: "default",
    navbar: "mainThemeLight",
    toolbar: "mainThemeLight",
    footer: "mainThemeLight"
  }
};

export default settingsConfig;
