import fs from 'fs';
import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.happyhues.co/');
  let colors = await page.evaluate(_ => {
    return Promise.resolve(
      Array.from(document.querySelectorAll('.collection-list .palette-wrap')).map($el => {
        return [
            $el.querySelector('.palette').style.getPropertyValue('background-color'),
            $el.querySelector('.palette-color:nth-child(1)').style.getPropertyValue('background-color'),
            $el.querySelector('.palette-color:nth-child(2)').style.getPropertyValue('background-color'),
            $el.querySelector('.palette-color:nth-child(3)').style.getPropertyValue('background-color'),
            $el.querySelector('.palette-color:nth-child(4)').style.getPropertyValue('background-color'),
            $el.querySelector('.palette-color:nth-child(5)').style.getPropertyValue('background-color'),
          ].map(c => c.replace(/\s/g, '')).filter(c => c)
      })
    );
  });
  await browser.close();
  
  // remove duplicate colors from array
  colors = colors.map(p => p.filter((color, index) => p.indexOf(color) === index));
  fs.writeFileSync('./palettes.json', JSON.stringify(colors, null, 2));
})();