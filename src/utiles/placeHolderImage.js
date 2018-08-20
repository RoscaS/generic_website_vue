import {Image} from '../components/Edit/Galleries/BuildGalleriesStores';
import GalleriesStore from '../components/Edit/Galleries/GalleriesStore'
import axios from "axios";

// const url = 'https://via.placeholder.com/350x200?text=Galerie+Vide';
// const url = 'https://picsum.photos/200';
axios.defaults.baseURL = 'http://localhost:8000/';
const url = 'galleries/get_placeholder/';



function getPlaceHolder(gallerieName) {
  axios.post(url, {gallery: gallerieName}).then(response => {
    response.data.image = axios.defaults.baseURL + response.data.image.slice(1)
    GalleriesStore.getStore(gallerieName).initImages([response.data]);
    console.log(response);
  });
}

// const PlaceHolder = new Image({
//   id: -1,
//   name: 'PlaceHolder',
//   position: 0,
//   gallery: null,
//   description: 'placeholder',
//   image: 'https://via.placeholder.com/350x200?text=Galerie+Vide',
//   url: null,
//   parentGallery: null
// });

export {getPlaceHolder};
