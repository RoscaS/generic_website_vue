class GalleryObject {
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


function BuildGalleriesStores() {
  let list = [
    new GalleryObject('Stock'),
    new GalleryObject('Carousel'),
    new GalleryObject('Events'),
    new GalleryObject('Parallax'),
  ];
  list[1]['options'] = {autoScroll: false, scrollTimer: 10};
  return list;
}

export default BuildGalleriesStores;
