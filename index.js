
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require('./custom-config');

(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    let runnerResult = await lighthouse('https://www.calvinklein.mx', {   port: chrome.port, output: 'html' }, config );
    fs.writeFileSync('Calvin_Klein-Report.html', runnerResult.report);

    runnerResult = await lighthouse('https://www.rapsodia.com.mx', {   port: chrome.port, output: 'html' }, config );
    fs.writeFileSync('Rapsodia-Report.html', runnerResult.report);

    await chrome.kill();
})();