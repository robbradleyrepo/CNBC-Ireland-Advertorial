const fs = require("fs");
const cnbcFn = require("./functions.js");

const htmlTemaplate = fs.readFileSync("./dist/index.html");

// // Insert Rendered APP
const ssr = require("../dist/ssr.js");
const renderedApp = ssr.module.renderCNBC();

let renderedTemplate = htmlTemaplate
  .toString()
  .replace("{{RENDERED_APP}}", renderedApp.html);
renderedTemplate = cnbcFn.cleanSVG(renderedTemplate);
renderedTemplate = renderedTemplate.replace(
  " <!-- APP_SC_CSS -->",
  renderedApp.styleTags
);

let output = cnbcFn.cleanSVG(renderedTemplate);

//Replace Local Ansolute URLs with CNBC FM Server
output = cnbcFn.makeRelative(output);
const dom = cnbcFn.createVirtualDom(output);
output = "<!doctype html>" + dom.serialize();

cnbcFn.writeOutpuFile(output);
