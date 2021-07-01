//Clear AWS Cache

console.log("Clear AWS Cache");
const AWS = require("aws-sdk");
const config = require("../package.json").cnbc;
const core = require("@actions/core");

let enviroment = process.argv[2];
var cloudfront = new AWS.CloudFront();
var params = {
  DistributionId: config.env[enviroment].aws_distribution,
  InvalidationBatch: {
    CallerReference: `${config.projectName}_${Date.now()}`,
    Paths: {
      Quantity: 1,
      Items: [`/${config.root}/${config.projectName}/*`],
    },
  },
};

cloudfront.createInvalidation(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
    core.setFailed(err);
  } else {
    console.log(data); // successful response
  }
});
