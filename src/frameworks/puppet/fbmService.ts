import {MarketplaceService} from '../'
import {Item} from '../../entities'

const puppeteer = require("puppeteer");

export default class FbmService implements MarketplaceService{
    browser: any
    page: any
    constructor(){}

    async _close(): Promise<void> {
        await this.browser.close()
    }

    async setup() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async fetchItemsForSale(query: string, count: number): Promise<Item[]> {
        await this._login();
        const items = await this._fetchItemsForSale(query, count);
        this._close();
        return items
    }

    async _fetchItemsForSale(query: string, count: number): Promise<Item[]> {
        // scrape data from page...
        await this._gotoSearch(query);
        await this._scrapeSearchResults();
        await this.page.screenshot({path: 'marketplace.png'});

        return new Promise(function(resolve, reject){
            resolve([
                new Item("Taylor Accoustic Guitar", "Guitar is in great condition. Needs new strings.", 400),
                new Item("Gibson Electric Guitar", "Needs some fixing up", 150)
            ]); 
        })
    }

    async _gotoSearch(query: string) {
        let result: Item[];
        await this.page.goto('https://www.facebook.com/marketplace/search/?query=' + query, { waitUntil: 'load'}).then((resolve) => {
            console.log(`loaded marketplace search: ${query}`);
        }).catch((err) => {
            console.log(`failed to load marketplace search. error: ${err}`);
        });
    }

    async _scrapeSearchResults(){
        const searchFeedElem = await this.page.$('[data-testid="marketplace_search_feed_content"]');
        
        const childNodeText = await searchFeedElem.$eval('div', node => node.children[0].innerHTML);
        console.log(childNodeText);
       // const text = await this.page.evaluate(searchFeedElem => searchFeedElem.textContent, searchFeedElem);
        //console.log("printing scrape result... " + text);
    }

    async _login() {
        await this.page.goto('https://www.facebook.com', { waitUntil: 'networkidle0' });
        await this.page.type('#email', '');
        await this.page.type('#pass', '');
        await Promise.all([
            this.page.click('#loginbutton'),
            this.page.waitForNavigation({ waitUntil: 'load' }),
        ]).catch((err) => {
            console.log(err);
        });
    }

    async _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}