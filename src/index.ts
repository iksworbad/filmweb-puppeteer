import { login } from './login';
import { openPuppeteer } from './openPuppeteer';
import { timeout } from './timeout';

interface Film {
  title: string | null,
  userScore: number | null,
  communityScore: number | null,
  year: number | null,
  genre: string | null,
  awards: string | null
}

run(process.argv[2], process.argv[3])

async function run (account: string, password: string) {
  const {browser, page} = await openPuppeteer();

  await login(page, account, password)
  await timeout(500)

  const linksToFilms =  await page.evaluate(() => {    
    const films = Array.prototype.slice.call(document.querySelectorAll(`.filmPreview__link`))
    return films.map((film: HTMLAnchorElement) =>  film.href);
  });

  let result = [];

  for (let i = 0; i < linksToFilms.length; i++) {
    await page.goto(linksToFilms[i]);

    const film = await page.evaluate((): Film => {  
      const getDataByClassName = (className: string, index = 0) => document.getElementsByClassName(className)[index]?.textContent         
      const title = getDataByClassName('filmCoverSection__title')
      const userScore = document.querySelectorAll('[data-rate]')[1]?.getAttribute('data-rate')
      const communityScoreElement = getDataByClassName('filmRating')
      const communityScore = communityScoreElement?.split(' ')[1].replace(',','.')
      const year = getDataByClassName('filmCoverSection__year')
      const genre = getDataByClassName('filmInfo__info', 2)
      const awards = getDataByClassName('awards__link')    

      return {
        title,
        userScore: userScore ? parseInt(userScore) : null,
        communityScore: communityScore ? parseFloat(communityScore) : null,
        year: year ? parseInt(year) : null,
        genre,
        awards
      }
    })

    result.push(film)
  }
  console.log(result)
  await browser.close();
}
