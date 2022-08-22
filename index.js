import lighthouse from "lighthouse"; // This should be at the top of the file
import puppeteer from "puppeteer";
import customConfig from './custom-config';
export function createBrowser() {
    return puppeteer.launch({
        args: ["--show-paint-rects"] // Required by lighthouse
    });
}

export function createReportWithBrowser(browser, url, options = { output: "html" }) {
  const endpoint = browser.wsEndpoint(); // Allows us to talk via DevTools protocol
  const endpointURL = new URL(endpoint); // Lighthouse only cares about the port, so we have to parse the URL so we can grab the port to talk to Chrome on
  return lighthouse(
    url,
    Object.assign({}, {
      port: endpointURL.port
    }, customConfig) // Allow options to override anything here
  );
}