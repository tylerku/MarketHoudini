import * as puppetMaster from './frameworks/puppet';
  
(async () => {
  await main();
  console.log("exiting...");
})();

interface FbMarketplaceService {
  init(): Promise<void>
  close(): Promise<void> 
  getResultsFromSearch(searchQuery: string, count: number): Promise<string[]>
}

async function main(){
  let fbmService: FbMarketplaceService;
  fbmService = new puppetMaster.FbmService();
  await fbmService.init();
  await fbmService.getResultsFromSearch("guitar", 10).catch((err) => {
    console.log("error fetching search results: " + err);
  })
  await fbmService.close();
}
  
