import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import Page from "./Page";
export function renderCNBC() {
  const sheet = new ServerStyleSheet();

  try {
    const html = renderToString(sheet.collectStyles(<Page />));
    const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    return { html, styleTags };
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }
}
