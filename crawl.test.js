const { normalizeURL, getURLsfromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsfromTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://blog.boot.dev/path/";
  const actual = getURLsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsfromTML relative", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/path">
              Boot.dev Blog
              </a>
          </body>
      </html>
      `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getURLsfromTML Both", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path one
                </a>
                <a href="/path2/">
                Boot.dev Blog path two
                </a>
            </body>
        </html>
        `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsfromTML invalid", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="invalid">
              Invalid URL
              </a>
          </body>
      </html>
      `;

  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
