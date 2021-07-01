const packageJSON = require("../package.json");
const deployFolder = packageJSON.cnbc.demoServer.projectName;
require("openurl").open(
  packageJSON.cnbc.demoServer.rootWeb + deployFolder + "/index.html"
);
