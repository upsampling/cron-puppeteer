// const lhDesktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');

export default {
    extends: 'lighthouse:default',
    // settings: {
    //   onlyCategories: ['performance', 'accessibility', 'best-practices'],
    //   preset: "desktop",
    //   formFactor: 'desktop',
    //   emulatedFormFactor: 'desktop',
    //   formFactor: 'desktop',
    // },
    // settings: {
	// 	formFactor: "desktop", // tells lighthouse to evaluate as desktop
	// 	screenEmulation: { disabled: true }, // don't emulate mobile or resized screen
	// 	// The performance scores are really long when custom 'Forum' audit is included, not sure why
	// 	// onlyCategories: ['Forum', 'performance'], // can add more categories like 'accessibility' here
    //     onlyCategories: ['performance', 'accessibility', 'best-practices'],
	// 	// emulatedUserAgent: lhDesktopConfig.settings.emulatedUserAgent,
	// }
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
        // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
        skipAudits: ['uses-http2'],
    }
  };