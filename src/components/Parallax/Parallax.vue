<template>
  <div>
    <EditIcon :component="$options.name" :id="idx" editMenu="image" top="10px"/>
    <section :id="id" class="parallax has-text-centered" :style="style">
      <h1 class="title">
        {{ title }}
      </h1>
    </section>

  </div>
</template>

<script>
  import ParallaxImagesStore from '../Parallax/ParallaxImagesStore';
  import EditIcon from '../Edit/EditIcon';
  import ImagesComponentMixin from '../../mixins/Galleries/ImagesComponentMixin';



  export default {
    name: 'Parallax',
    mixins: [ImagesComponentMixin],
    components: {EditIcon},
    props: {
      idx: {type: Number},
      height: {type: String}
    },
    data() {
      return {
        component: 'Parallax',
        store: ParallaxImagesStore,
        state: {images: []},

        image: null,
        title: null,
      };
    },
    computed: {
      id() {return `Parallax${this.idx}`;},
      style() {
        if (this.store.dataSet) {
          this.title = this.store.state.images[this.idx].description;
          return {
            backgroundImage: `url(${this.store.state.images[this.idx].url})`,
            minHeight: this.height
          };
        } else {
          setTimeout(() => { return this.style;}, 2);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .parallax {
    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.75;
    position: relative;

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      will-change: transform;
    }

    h1 {
      color: white;
      font-size: 50px;
      font-weight: normal;
    }
  }
</style>
