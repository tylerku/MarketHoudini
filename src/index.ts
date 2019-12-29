import * as puppetMaster from './frameworks/puppet';
//import * as scrapyMaster from './frameworks/scrapy';
import {MarketplaceService} from './frameworks';
import {Item} from './entities';
  
(async () => {
  await main();
  console.log("exiting main");
})();


async function main(){
  let fbmService: MarketplaceService;
  fbmService = new puppetMaster.FbmService();
  // fbmService = new scrapyMaster.FbmService();    <==== Use to switch from using puppeteer to scrappy 
  await fbmService.setup();
  await fbmService.fetchItemsForSale("guitar", 10).then((value: Item[]) => {
    console.log(value)
  }).catch((err) => {
    console.log("error fetching search results: " + err);
  });
}
  
