import lighthouse from "lighthouse"; // This should be at the top of the file
import puppeteer from "puppeteer";


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
    },{
      output: "html",
      extends: 'lighthouse:default',
      settings: {
          maxWaitForFcp: 15 * 1000,
          maxWaitForLoad: 35 * 1000,
          formFactor: 'desktop',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          throttling: {
              rttMs: 40,
              throughputKbps: 10 * 1024,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0, // 0 means unset
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
          screenEmulation: {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
              disabled: false,
            },
          emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse',
          skipAudits: ['uses-http2'],
      }
    })
  );
}