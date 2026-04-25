import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page'
import { TopMenuPage } from '../pages/top-menu-page';
import{
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright'

// AAA
// POM --> Page Object Model

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topmenuPage: TopMenuPage;
const pageUrl = /.*intro/;

// Applitools
// export const USER_UKTRAFAST_GRID: boolean = true;
export const USER_UKTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

// beforeAll for Applitools
test.beforeAll(async () => {

    if (USER_UKTRAFAST_GRID) {
        Runner = new VisualGridRunner({testConcurrency: 5});
    } else {
        Runner = new ClassicRunner();
    }

    const runnerName = USER_UKTRAFAST_GRID ? 'Ultrafast Grid' : 'Classic Runner';
    Batch = new BatchInfo({name: 'Playwright website -  + ${runnerName}'});

    Config = new Configuration();
    // Config.setApiKey("YOUR_API_KEY");

    Config.setBatch(Batch);
    if (USER_UKTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});



test.beforeEach(async ({page}) => {
    //Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        'Playwright',
        test.info().title,
        {width: 1024, height: 768}
    );
    // end of Applitools
    
    await page.goto(URL);
    homePage = new HomePage (page);
});

test.afterEach(async ({page}) => {
    await eyes.close();
});

test.afterAll(async () => {
    // forces Playwright to wait synchronously for all visual checkpoints to be processed before the test ends
    const results = await Runner.getAllTestResults();
    console.log('Visual test results:', results);
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

    // https://applittols.com/docs/api/eyes-sdk-playwright/classes/eyes/check.html#check
    await eyes.check('Home page', Target.window().fully());
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
