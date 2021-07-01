//const { series } = require("async");
const { execSync } = require("child_process");
const config = require("../package.json").cnbc;
const { getJunitXml } = require("junit-xml");
const fs = require("fs");
const enviroment = process.argv[2];
const pthreshold = 30;
const athreshold = 50;
const bthreshold = 70;
const sthreshold = 70;

const TEST_URL = `https://${config.env[enviroment].aws_bucket}.s3.${config.env[enviroment].aws_region}.amazonaws.com/advertorial/${config.projectName}/index.html`;
console.log("Running Google Lighthouse Test");
console.log("URL:", TEST_URL);
const outLighthouse = execSync(
  `lighthouse ${TEST_URL} --quiet --chrome-flags="--headless --disable-gpu --no-sandbox" --output json`
);
const result = JSON.parse(outLighthouse.toString());

const performanceScore = result.categories["performance"].score * 100;
const accessibilityScore = result.categories["accessibility"].score * 100;
const bpScore = result.categories["best-practices"].score * 100;
const seoScore = result.categories["seo"].score * 100;

const testSuiteReport = {
  name: "Google Lighthouse Test",
  suites: [
    getTestCaseResult("Performance", performanceScore, pthreshold),
    getTestCaseResult("Accessibility", accessibilityScore, athreshold),
    getTestCaseResult("Best practices", bpScore, bthreshold),
    getTestCaseResult("SEO", sthreshold, sthreshold)
  ]
};
const junitXml = getJunitXml(testSuiteReport);

function getTestCaseResult(name, score, threshold) {
  if (score >= threshold) {
    return {
      name: name,
      timestamp: new Date(),
      time: 0,
      testCases: [
        {
          name: `${name} Score above ${threshold}`,
          assertions: 1
        }
      ]
    };
  } else {
    return {
      name: name,
      timestamp: new Date(),
      time: 0,
      testCases: [
        {
          name: `${name} Score above ${threshold}`,
          assertions: 1,
          failures: [
            {
              message: `${name} test doe not meet requirements min ${threshold} you got ${score}`
            }
          ]
        }
      ]
    };
  }
}

console.log("Results:");
console.log("Performance Score:", result.categories["performance"].score * 100);
console.log(
  "Accessibility Score:",
  result.categories["accessibility"].score * 100
);
console.log(
  "Best Practice Score:",
  result.categories["best-practices"].score * 100
);
console.log("SEO Score:", result.categories["seo"].score * 100);
console.log("END");

console.log("Writing Results");
fs.writeFileSync("./test-reports/lighthouse.xml", junitXml);

if (
  performanceScore < pthreshold ||
  accessibilityScore < athreshold ||
  bpScore < bthreshold ||
  seoScore < sthreshold
) {
  console.error("Lighhouse Test Failure");
  process.exit(1);
}
