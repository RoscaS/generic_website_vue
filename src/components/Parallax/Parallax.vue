<template>
  <div>
    <EditIcon :store="store" :edit="edit" top="50px"/>
    <section class="parallax has-text-centered" :style="style">
      <h1 class="title">{{ text }}</h1>
    </section>
  </div>
</template>

<script>
  import 'vueperslides/dist/vueperslides.min.css';
  import ViewsMixin from '../../mixins/ViewsMixin';
  import EditIcon from '../Edit/EditIcon';

  export default {
    name: 'Parallax',
    mixins: [ViewsMixin],
    components: {EditIcon},
    props: {
      idx: {type: Number},
      height: {type: String},
      text: {type: String},
    },
    data: () => ({
      component: 'Parallax',
      type: 'image',
    }),
    computed: {
      title() {
        return this.getImage(this.idx).description;
      },
      style() {
        return {
          backgroundImage: `url(${this.getImage(this.idx).image})`,
          minHeight: this.height
        };
      }
    }
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
      font-size: 50px !important;
      font-weight: lighter;
    }
  }
</style>
