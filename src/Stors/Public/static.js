const base = 'http://localhost:8000/';

const endPoints = {
  promo: 'promo/1',
  presentation: 'presentation/1',
};



function makeUrls() {
  let urls = {};
  for (let key in endPoints) {
    urls[key] = base + endPoints[key];
  }
  return urls
}

let urls = makeUrls();

export default urls;
