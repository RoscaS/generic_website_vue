// import ImageStore from '../../components/Components/GalleryManager/ImageStore';
//
//
// export default {
//   data() {
//     return {
//       name: this.$options.name,
//       store: ImageStore,
//
//     }
//   },
//
//   methods: {
//     setData() {
//       if (this.store.fetchFlag) {
//         console.log('ici')
//         this.state = this.gallery.state.images
//       } else {
//         setTimeout(() => { this.setData(); }, 2);
//       }
//     },
//     copyData(from, to) {
//       for (let i in from) { to[i] = from[i]; }
//     },
//   },
//
//   created() {
//     this.store.init();
//   },
// };
