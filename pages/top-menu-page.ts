import { expect, type Locator, type Page } from "@playwright/test";

export class TopMenuPage{
    //variables
    readonly page:Page;

    //await page.getByRole('button', {name: 'Node.js'}).hover();

    readonly nodeLink : Locator;
    readonly javaLink : Locator;
    readonly docsLink : Locator;
    readonly javaURL = 'https://playwright.dev/java/docs/intro';

    // constructor
    constructor (page:Page) {
        this.page = page;

        this.nodeLink = this.nodeLink = page.getByRole('button', { name: 'Node.js' });
        this.javaLink = this.javaLink = page.getByRole('main').getByRole('link', { name: 'Java'});
        //this.javaLink = this.javaLink = page.locator('a[href="https://playwright.dev/java/docs/intro"]');
        this.docsLink = this.docsLink = page.getByRole('link', {name: 'Docs'});

        this.javaURL = this.javaURL;
    }

    //methods
    async hoverGetNodeLink (){
        await this.nodeLink.hover();
    }
    async clickJavaLink (){
        await this.javaLink.click();
    }
    async clickDocsLink (){
        await this.docsLink.click();
    }
    
}

export default TopMenuPage;