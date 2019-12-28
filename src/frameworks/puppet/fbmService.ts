const puppeteer = require("puppeteer");

export default class FbmService {
    browser: any
    page: any
    constructor(){}

    async init() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this._login()
    }

    async close(): Promise<void> {
        await this.browser.close()
    }

    async getResultsFromSearch(searchQuery: string, count: number): Promise<string[]> {
        await this._gotoMarketplace();
        return new Promise(function(resolve, reject){
            resolve(["one", "two"])
        })
    }

    async _gotoMarketplace() {
        await this.page.goto('https://www.facebook.com/marketplace', { waitUntil: 'load'}).catch((err) => {
            console.log('failed to load marketplace homepage. error: ' + err);
        });
        await this.page.screenshot({path: 'snapshot.png'});
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