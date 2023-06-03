const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');

let UserAgent = 'Mozilla/5.0 (Linux; Android 11; 4K Google TV Box Build/RTT0.210829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.76 Safari/537.36';

if (process.versions.chrome) {
  console.log(`Chrome version: ${process.versions.chrome}`)
  UserAgent = UserAgent.replace('Chrome/113.0.5672.76', `Chrome/${process.versions.chrome}`);
}

writeFileSync('temp/user-agent.txt', UserAgent, 'utf8');

fetch('https://www.youtube.com')
.then(async (response) => {
  console.log(`Status: ${response.status}`)
  html = await response.text();
  console.log(`Fetched: ${response.url}`)
  const dom = new JSDOM(html);

  let result;
  const links = [...dom.window.document.head.children].filter((child) => child.tagName === 'LINK');
  if (links.length > 0) {
    const icons = links.filter((link) => link.rel === 'icon');
    if (icons.length > 0) {
      console.log(`Found ${icons.length} icons`)
      const sizes = icons.map((icon) => parseInt(icon.getAttribute('sizes').split('x')[0], 10));
      const maxSize = Math.max(...sizes);
      const icon = icons.find((icon) => parseInt(icon.getAttribute('sizes').split('x')[0], 10) === maxSize);
      result = icon.href;
      console.log(`Using icon with size ${maxSize}`)
    }

    if (!result) {
      const icon = links.find((link) => link.rel === 'shortcut icon');
      console.log(`Using icon with rel "shortcut icon"`)
      if (icon) {
        result = icon.href;
      }
    }
  }

  console.log(`Result: ${result}`);
  if (!result) return;

  await fetch(result)
  .then(async (response) => response.arrayBuffer())
  .then((arrayBuffer) => writeFileSync(`temp/icon${/.ico$/.exec(result) ? '.ico' : '.png'}`, Buffer.from(arrayBuffer), 'binary'));
})
.then(() => {
  console.log(`process done`)
  process.exit(0);
});
