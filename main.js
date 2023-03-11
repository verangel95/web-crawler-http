const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length < 3) {
    console.log("no Website provied");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many comand line args");
    process.exit(1);
  }

  const baseURL = process.argv[2];

  console.log("Starting crawl", baseURL);
  crawlPage(baseURL);
}

main();
