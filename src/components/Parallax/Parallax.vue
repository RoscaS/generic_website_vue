<template>
  <div>
    <EditIcon :store="store" :edit="edit" top="10px"/>
    <section :id="id" class="parallax has-text-centered" :style="style">
      <h1 class="title">{{ title }}</h1>
    </section>

  </div>
</template>

<script>
  import EditIcon from '../Edit/EditIcon';
  import ViewsMixin from '../../mixins/ViewsMixin';

  export default {
    name: 'Parallax',
    mixins: [ViewsMixin],
    components: {EditIcon},
    props: {
      idx: {type: Number},
      height: {type: String}
    },
    data() {
      return {
        component: 'Parallax',
        type: 'image',

        // image: null,
        title: null,
      };
    },
    computed: {
      id() {return `Parallax${this.idx}`;},
      style() {
        if (this.isReady) {
          this.title = this.images[this.idx].description;
          return {
            backgroundImage: `url(${this.images[this.idx].image})`,
            minHeight: this.height
          };
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
