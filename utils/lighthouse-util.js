import lighthouse from "lighthouse"; // This should be at the top of the file
import puppeteer from "puppeteer";
import { customConfig } from "./custom-config.js";

export function createBrowser() {
    return puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--show-paint-rects"] // Required by lighthouse
    });
}

export function createReportWithBrowser(browser, url) {

  const endpoint = browser.wsEndpoint();
  const endpointURL = new URL(endpoint);

  return lighthouse( url, { port: endpointURL.port, output: "json", }, customConfig );

}