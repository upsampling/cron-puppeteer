import { createBrowser, createReportWithBrowser } from "./lighthouse-util.js";
import fs from "fs";

(async () => {
  
  const browser = await createBrowser();
  
  let result = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
  fs.writeFileSync("./reports/[REPORT][RAPSODIA].json", result.report, "utf-8");

  result = await createReportWithBrowser( browser, "https://www.calvinklein.mx" );
  fs.writeFileSync("./reports/[REPORT][CALVIN KLEIN].json", result.report, "utf-8");
  
  await browser.close();
})().catch(console.error)
    .then(() => {
       console.log("Finished!");
    });