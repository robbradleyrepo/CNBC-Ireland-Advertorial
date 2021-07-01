import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import Page from "./Page";

ReactDOM.render(
  <Page />,
  document.getElementById("CNBCCatalystCampaign_Root"),
  function() {
    if (window.controlNavigation) window.controlNavigation();
  }
);
