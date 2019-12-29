import { stringify } from "querystring";
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
        const items = await this._searchMarketplace(query, count);
        this._close();
        return items
    }

    async _searchMarketplace(query: string, count: number): Promise<Item[]> {
        await this.page.goto('https://www.facebook.com/marketplace', { waitUntil: 'load'}).catch((err) => {
            console.log('failed to load marketplace homepage. error: ' + err);
        });
        //await this.page.screenshot({path: 'snapshot.png'});

        // scrape data from page...

        return new Promise(function(resolve, reject){
            resolve([
                new Item("Taylor Accoustic Guitar", "Guitar is in great condition. Needs new strings.", 400),
                new Item("Gibson Electric Guitar", "Needs some fixing up", 150)
            ]);
        })
    }

    async _login() {
        await this.page.goto('https://www.facebook.com', { waitUntil: 'networkidle0' });
        await this.page.type('#email', '7244064427');
        await this.page.type('#pass', 'MilesCity94!');
        await Promise.all([
            this.page.click('#loginbutton'),
            this.page.waitForNavigation({ waitUntil: 'load' }),
        ]).catch((err) => {
            console.log(err);
        });
    }
}