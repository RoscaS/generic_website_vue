class Gallery {
  constructor(name) {
    this.state = {images: []};
    this.related = name;
    this.url = `galleries/${name}/`;
    this.isLocked = false;
    this.limit = null;
  }

  count = () => this.state.images.length;
  isFull = () => this.count() >= this.limit;
  lock = () => this.isLocked = true;
  unlock = () => this.isLocked = false;
}

class Carousel extends Gallery {
  constructor(name) {
    super(name);
    this.options = {autoScroll: false, scrollTimer: 10};
  }
}

function Galleries(lst = []) {
  let galleries = ['Stock', 'Carousel', 'Events', 'Parallax', 'Articles'];
  galleries.forEach(i => {
    lst.push(i == 'Carousel' ? new Carousel(i) : new Gallery(i));
  });
  return lst;
}

export default Galleries;
