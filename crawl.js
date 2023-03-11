const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

async function crawlPage(currentURL) {
  console.log("actively crawling the:", currentURL);

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(
        "error in fetch with status code ",
        res.status,
        "on page: ",
        currentURL
      );
      return;
    }

    const contenttype = res.headers.get("content-type");
    if (!contenttype.includes("text/html")) {
      console.log(
        `no html response, content type: ${contenttype}, on page: ${currentURL}`
      );
      return;
    }

    console.log(await res.text());
  } catch (error) {
    console.log("Error in fetch", error.message);
  }
}

function getURLsfromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log("error with relative URL, ", error.message);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(`${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log("error with absolute URL, ", error.message);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsfromHTML,
  crawlPage,
};
