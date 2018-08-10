
function GalleriesStores() {
  return [
    {
      state: {images: []},
      related: 'Stock',
      string: 'stock',
      title: 'Stock',
      url: 'galleries/stock/',
    },
    {
      state: {images: []},
      related: 'Carousel',
      string: 'carousel',
      title: 'Carousel',
      url: 'galleries/carousel/',
    },
    {
      state: {images: []},
      related: 'Events',
      string: 'events',
      title: 'Galerie',
      url: 'galleries/events/',
    },
    {
      state: {images: []},
      related: 'Parallax',
      string: 'parallax',
      title: 'Parallax',
      url: 'galleries/parallax/',
    }
  ];
}

export default GalleriesStores
