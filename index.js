import { createBrowser, createReportWithBrowser } from "./utils/lighthouse-util.js";
import fs from "fs";
import { CronJob }  from 'cron';

const getDate = ()=>{
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  
  return dateTime
}


const job = new CronJob(
	'*/5 * * * *',
	async function() {
    console.log('Cron Start at: ', getDate())
    const browser = await createBrowser();
  
    let result = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
    fs.writeFileSync(`./reports/Rapsodia/[RAPSODIA][${getDate()}].json`, result.report, "utf-8");
  
    result = await createReportWithBrowser( browser, "https://www.calvinklein.mx" );
    fs.writeFileSync(`./reports/CalvinKlein/[CALVIN KLEIN][${getDate()}].json`, result.report, "utf-8");
    
    await browser.close();
    console.log('Cron Finish at: ', getDate())
	},
	null,
	true,
	'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
job.start()

// (async () => {
  
//   const browser = await createBrowser();
  
//   let result = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
//   fs.writeFileSync("./reports/[RAPSODIA].json", result.report, "utf-8");

//   result = await createReportWithBrowser( browser, "https://www.calvinklein.mx" );
//   fs.writeFileSync("./reports/[CALVIN KLEIN].json", result.report, "utf-8");
  
//   await browser.close();
// })().catch(console.error)
//     .then(() => {
//        console.log("Finished!");
//     });