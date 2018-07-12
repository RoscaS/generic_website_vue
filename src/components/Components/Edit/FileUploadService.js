import axios from 'axios';


const BASE_URL = 'http://localhost:8000';

// function upload(formData) {
//   const url = `${BASE_URL}/images/`;
//   return axios.post(url, formData)
//     .then(x => x.data)
//     .then(x => x.map(img => Object.assign({},
//       img, { url: `${BASE_URL}/images/t${img.id}/`})));
// }


function upload(formData) {
  const photos = formData.getAll('photos');
  console.log(photos);
  return axios.post('http://localhost:8000/images/', {
    image: photos[0],
    gallery: 'carousel',
    description: 'poule'
  })
    .then(x => x.data)
    .then(x => x.map(img => Object.assign({},
        img, { url: `${BASE_URL}/images/${img.id}`})));
}


export { upload }
//
//
// function upload(formData) {
//     const photos = formData.getAll('photos');
//     // console.log(photos)
//     const promises = photos.map((x) => getImage(x)
//         .then(img => ({
//             id: img,
//             originalName: x.name,
//             fileName: x.name,
//             url: img
//         })));
//     console.log(promises)
//     return Promise.all(promises);
// }
//
// function getImage(file) {
//     return new Promise((resolve, reject) => {
//         const fReader = new FileReader();
//         const img = document.createElement('img');
//
//         fReader.onload = () => {
//             img.src = fReader.result;
//             resolve(getBase64Image(img));
//         }
//
//         fReader.readAsDataURL(file);
//     })
// }
//
// function getBase64Image(img) {
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;
//
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0);
//
//     const dataURL = canvas.toDataURL('image/png');
//
//     return dataURL;
// }
//
// export { upload }
