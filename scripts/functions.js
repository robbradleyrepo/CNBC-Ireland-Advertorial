// ---------------- -------------------- Functions
const fs = require("fs");
const config = require("../package.json").cnbc;
function removeCNBCPlaceholder(output) {
  let placeHolderHeader = output.substring(
    output.indexOf("<!-- CNBC_PLACEHOLDER:START -->"),
    output.indexOf("<!-- CNBC_PLACEHOLDER:END -->") +
      "<!-- CNBC_PLACEHOLDER:END -->".length
  );
  let result = output.replace(placeHolderHeader, "");
  let placeHolderDown = result.substring(
    result.indexOf("<!-- CNBC_PLACEHOLDER_DOWN:START -->"),
    result.indexOf("<!-- CNBC_PLACEHOLDER_DOWN:END -->") +
      "<!-- CNBC_PLACEHOLDER_DOWN:END -->".length
  );

  result = result.replace(placeHolderDown, "");
  return result;
}

function addExternalDependenciesScripts(output) {
  //Insert React and Vendor CDN links
  const vendorScripts = `
    <script crossorigin   src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin   src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    `;
  const outputTemplate = output
    .toString("utf8")
    .replace("<!-- VENDOR_CDN_SCRIPTS -->", vendorScripts);
  return outputTemplate;
}

function writeOutpuFile(output) {
  //Write Output to file system
  fs.writeFileSync("./dist/index.html", output);
  fs.writeFileSync("./dist/output.html", output);
  console.log("***************** SUCCESS *****************");
  console.log(
    "Output file generated at ./dist/output.html.\n Copy/paste output into Carbon Page Code Editor."
  );
  console.log("\n\n\n");
}
function createVirtualDom(baseOutput) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM(baseOutput);
  return dom;
}

function cleanSVG(baseOutput) {
  //creating dom to manipulate render to compoly with carbon
  const dom = createVirtualDom(baseOutput);
  const document = dom.window.document;
  let output = baseOutput;
  for (let i = 0; i < document.getElementsByTagName("svg").length; i++) {
    document
      .getElementsByTagName("svg")
      .item(i)
      .removeAttribute("id");
  }

  for (let i = 0; i < document.getElementsByTagName("path").length; i++) {
    document
      .getElementsByTagName("path")
      .item(i)
      .removeAttribute("id");
  }

  for (let i = 0; i < document.getElementsByTagName("g").length; i++) {
    document
      .getElementsByTagName("g")
      .item(i)
      .removeAttribute("id");
  }
  output = dom.serialize();
  // Fix Inline SVG viewbox for carbon
  output = output.replace(/viewBox=/g, "viewbox=");
  output = output.replace(/foreignObject/g, "foreignobject");
  output = output.replace(/preserveAspectRatio/g, "preserveaspectratio");
  // Clean JSDOM uneeded Tags
  return prepareHTMLCarbon(output);
}
function insertApp(template) {
  let out = template.replace(
    "<!-- APP_BUNDLE_CSS -->",
    `<link rel="stylesheet" type="text/css" href="http://localhost:8080/main.css"/>
  `
  );
  out = out.replace(
    "<!-- APP_BUNDLE_JS -->",
    `<script src="http://localhost:8080/main.js"></script>`
  );
  return out;
}
function prepareHTMLCarbon(output) {
  let cleanOut = output.replace("<html>", "");
  cleanOut = cleanOut.replace("<head>", "");
  cleanOut = cleanOut.replace("</head>", "");
  cleanOut = cleanOut.replace("</html>", "");
  cleanOut = cleanOut.replace("<body>", "");
  cleanOut = cleanOut.replace("</body>", "");
  cleanOut = cleanOut.replace(
    "<title>CNBC Catalyst (DO NOT CHANGE)</title>",
    ""
  );
  return cleanOut;
}

//Replace Local Ansolute URLs with CNBC FM Server
function pointAssetsToServer(output, env = "develop") {
  let buster = Buffer.from(Math.random().toString()).toString("base64");
  let newOut = output;
  let urlList = output.match(/http:\/\/localhost:8080\/?(.+?["]|['])/g);
  if (urlList) {
    urlList = urlList.map(url => url.substring(0, url.length - 1));
    urlList.forEach(url => {
      newOut = newOut.replace(url, url + "?c=" + buster);
    });
  }

  newOut = newOut.replace(
    /http:\/\/localhost:8080\//g,
    `${config.env[env].aws_root}/${config.projectName}/`
  );

  return newOut;
}

function makeRelative(output) {
  let buster = Buffer.from(Math.random().toString()).toString("base64");
  let newOut = output;
  let urlList = output.match(/http:\/\/localhost:8080\/?(.+?["]|['])/g);
  if (urlList) {
    urlList = urlList.map(url => url.substring(0, url.length - 1));
    urlList.forEach(url => {
      newOut = newOut.replace(url, url + "?c=" + buster);
    });
  }

  newOut = newOut.replace(/http:\/\/localhost:8080\//g, ``);
  return newOut;
}

module.exports = {
  insertApp,
  makeRelative,
  removeCNBCPlaceholder,
  addExternalDependenciesScripts,
  writeOutpuFile,
  createVirtualDom,
  cleanSVG,
  prepareHTMLCarbon,
  pointAssetsToServer
};
