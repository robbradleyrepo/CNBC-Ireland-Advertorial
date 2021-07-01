// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const fs = require("fs");
const { getContentType } = require("./contentTypes").default;
const path = require("path");
const config = require("../package.json").cnbc;

let enviroment = process.argv[2];
const deployFolder = config.root + "/" + config.projectName;

// Set the region
AWS.config.update({
  region: config.env[enviroment].aws_region,
});
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

console.log("Deploying to server");
putFolderRecursive("./public", "./public");
putFolderRecursive("./dist", "./dist");

function putFolderRecursive(path, rootPath = "/") {
  const folder = fs.readdirSync(path, { withFileTypes: true });
  folder.forEach((subPath) => {
    if (!subPath.isDirectory()) {
      if (subPath.name.charAt(0) !== ".") {
        // ignore hidden files
        const from = path + "/" + subPath.name;
        const to =
          deployFolder + path.replace(rootPath, "") + "/" + subPath.name;
        putFile(from, to);
      }
    } else {
      putFolderRecursive(path + "/" + subPath.name, rootPath);
    }
  });
}

function putFile(from, to) {
  const ContentType = getContentType(path.extname(from).substr(1));
  const uploadParams = {
    Bucket: config.env[enviroment].aws_bucket,
    Key: "",
    Body: "",
    ContentType,
  };
  console.log("Uploading:", to);
  const fileStream = fs.createReadStream(from);
  uploadParams.Body = fileStream;
  uploadParams.Key = to;
  s3.upload(uploadParams)
    .promise()
    .then((res) => {
      console.log("Upload Success:", res.Location);
    })
    .catch((e) => {
      console.log(e);
    });
}
