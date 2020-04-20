import { timeout } from './timeout';
import { Page } from 'puppeteer';


export const login = async (page: Page, account: string, password: string) => {
  await page.goto('https://www.filmweb.pl/login')
  await page.click(`[class="fwBtn fwBtn--gold"]`) // KamilDabrowski
  await page.click(`[class="authPage__button authButton authButton--filmweb"]`) // KamilDabrowski
  await page.type(`[type="text"]`, account);
  await page.type(`[type="password"]`, password);
  await page.click(`[class="popupForm__button authButton authButton--submit materialForm__submit"]`)
  await timeout(1000)
  await page.goto(`https://www.filmweb.pl/user/${account}/films`)
} 