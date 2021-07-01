const fs = require("fs");
const packageJSON = require("../package.json");
//const env = require("dotenv").config().parsed;
require("dotenv").config();
console.log("***************** DEPLOY FTP *****************");

const ftpCredentials = {
  host: process.env.DEMO_SERVER_FTP_HOST,
  port: process.env.DEMO_SERVER_FTP_PORT,
  user: process.env.DEMO_SERVER_FTP_USER,
  password: process.env.DEMO_SERVER_FTP_PASSWORD
};

function putFolderRecursive(path, rootPath = "/") {
  const folder = fs.readdirSync(path, { withFileTypes: true });
  folder.forEach(subPath => {
    if (!subPath.isDirectory()) {
      putFile(subPath.name, path, rootPath);
    } else {
      createFolder(subPath.name, () => {
        putFolderRecursive(path + "/" + subPath.name, rootPath);
      });
    }
  });
}

const ftpRoot = packageJSON.cnbc.demoServer.rootFtp;
const deployFolder = packageJSON.cnbc.demoServer.projectName;

var Client = require("ftp");

var ftpConnection = new Client();
ftpConnection.on("ready", function() {
  ftpConnection.mkdir(ftpRoot + deployFolder, err => {
    if (!err || err.code == 550) {
      putFolderRecursive("./public", "./public");
      putIndexFile();
    } else {
      console.error(err);
      ftpConnection.end();
    }
  });
});

ftpConnection.connect(ftpCredentials);

function putIndexFile() {
  ftpConnection.put(
    "./dist/output.html",
    ftpRoot + deployFolder + "/index.html",
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          "Puting:",
          "./dist/output.html",
          "-->",
          ftpRoot + deployFolder + "/index.html"
        );
        ftpConnection.end();
      }
    }
  );
}

ftpConnection.on("end", () => {
  console.log("***************** SUCCESS *****************");
  console.log("You can view deployed content at");
  console.log(packageJSON.cnbc.demoServer.rootWeb + deployFolder);
});

function putFile(pathName, location, rootPath) {
  const from = location + "/" + pathName;
  const to =
    ftpRoot + deployFolder + location.replace(rootPath, "") + "/" + pathName;

  ftpConnection.put(from, to, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Puting:", from, "-->", to);
    }
  });
}

function createFolder(path, callback) {
  console.log("Creating folder", ftpRoot + deployFolder + "/" + path);
  ftpConnection.mkdir(ftpRoot + deployFolder + "/" + path, err => {
    if (!err || err.code == 550) {
      callback();
    } else {
      console.error(err);
      ftpConnection.end();
    }
  });
}
