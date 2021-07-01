const fs = require("fs");
const cnbcFn = require("./functions.js");

const htmlTemaplate = fs.readFileSync("./src/index.html");

let enviroment = process.argv[2];

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

let output = cnbcFn.insertApp(renderedTemplate);

//Extract Placeholder Header
output = cnbcFn.removeCNBCPlaceholder(output);

//Replace Local Ansolute URLs with CNBC FM Server
output = cnbcFn.pointAssetsToServer(output, enviroment);

output = cnbcFn.prepareHTMLCarbon(output);
cnbcFn.writeOutpuFile(output);
