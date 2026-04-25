import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page'
import { TopMenuPage } from '../pages/top-menu-page';


// AAA
// POM --> Page Object Model

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topmenuPage: TopMenuPage;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage (page);
});

async function clickGetStarted(page:Page) {
      // await page.getByRole('link', { name: 'Get started' }).click();
      await homePage.assertPageTitle();
      topmenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {

    test('has title', async () => {

    // Expect a title "to contain" a substring.
    await homePage.assertPageTitle();
    });

    test('get started link', async ({ page }) => {

        // Click the get started link.
        await homePage.clickgetStarted();

        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });

    test('check Java page', async ({page}) =>{

        const javaDescriptions = 'Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project'

        // Actions  
        await clickGetStarted(page);
        await expect(page).toHaveURL('https://playwright.dev/')

        await topmenuPage.hoverGetNodeLink();
        //await page.getByRole('button', {name: 'Node.js'}).hover();
        
        topmenuPage.clickJavaLink();
         //await page.getByText('Java', {exact: true}).click();

        // // Expected
        await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
        await expect(page.getByText('Installing Playwright', {exact:true})).not.toBeVisible();
        await expect(page.getByText(javaDescriptions)).toBeVisible();

    });

    test('check docs page', async ({page}) =>{
        
        const docsURL = 'https://playwright.dev/docs/intro'

        topmenuPage = new TopMenuPage(page);
        topmenuPage.clickDocsLink();

        await expect(page).toHaveURL(docsURL);

    });
})

