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

//cron que se ejecuta cada 5 min
const job = new CronJob(
	'0 */2 * * *',
	async function() {
    console.log('Cron Start at: ', getDate());
    const browser = await createBrowser()
  
    const resultRapsodia = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
    const jsonResponse = JSON.parse(resultRapsodia.report);
    const { categories: {performance: {id, score}} } = jsonResponse;
    console.log({id, score});
    
    await browser.close();
    console.log('Cron Finish at: ', getDate())
	},
	null,
	true,
	'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
job.start()

//función autoinvocable
// (async () => {
  
//   const browser = await createBrowser();
  
//   // const resultRapsodia = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
//   // fs.writeFileSync(`./reports/[RAPSODIA].html`, resultRapsodia.report, "utf-8");

//   // const resultCalvinKlein = await createReportWithBrowser( browser, "https://www.calvinklein.mx" );
//   // fs.writeFileSync("./reports/[CALVIN KLEIN].html", resultCalvinKlein.report, "utf-8");
//   const resultRapsodia = await createReportWithBrowser( browser, "https://www.rapsodia.com.mx" );
//   const jsonResponse = JSON.parse(resultRapsodia.report);
//   const { categories: {performance} } = jsonResponse;
//   console.log('categories: ', performance);

// await browser.close();})
// ()
// .catch(console.error)
// .then(() => {
//        console.log("Finished!");
//   });