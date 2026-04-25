import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page'
import { TopMenuPage } from '../pages/top-menu-page';


const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topmenuPage: TopMenuPage;


test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage (page);
});