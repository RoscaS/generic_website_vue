<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3 gallery-col"
               v-for="image in state.images"
               v-scroll-reveal="{
                origin: 'left',
                distance: '100px',
                duration: 1500,
                delay: 200,
                easing: 'ease',
               }">
            <a class="no-tr"
               :href="image.url"
               :description="image.description"
               v-lightbox
               @click="clickImage(image)">
              <img :src="image.url"
                   :class="[imgClass, {'img-selected': image.selected}]"/>
            </a>
          </div>
        </div>
      </div>
    </div>

    <Lightbox v-if="!isAdmin"></Lightbox>
  </div>
</template>

<script>
  import ImagesComponentMixin
    from '../../mixins/Galleries/ImagesComponentMixin';
  import EventsImagesStore from './EventsImagesStore';
  import Lightbox from '../../components/Lightbox/Lightbox';

  export default {
    name: "EventsImages",
    mixins: [ImagesComponentMixin],
    components: {Lightbox},
    data() {
      return {
        component: 'Events',
        store: EventsImagesStore,

        state: EventsImagesStore.state,
        isAdmin: false,
      };
    },

    computed: {
      imgClass() { return this.isAdmin ? 'img-admin' : 'img-user'; }
    },

    methods: {
      clickImage(image) {
        if (!this.isAdmin) {
          this.lockScroll();
        }
        // else {
        //   image.selected = !image.selected;
        // }
      },
      lockScroll() {
        let x = window.scrollX;
        let y = window.scrollY;
        window.onscroll = function() {window.scrollTo(x, y);};
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  img {
    cursor: pointer;
    transition: box-shadow .5s ease, transform .5s ease-out;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    transform: scale(1);
  }

  .img-user {
    &:hover {
      transition: box-shadow .5s ease, transform .5s ease-out;
      -webkit-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      transform: scale(1.1);
    }
  }

  .img-admin {
    &:hover {
      /*transition: box-shadow .5s ease-out;*/
      /*-webkit-box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
      /*-moz-box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
      /*box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
    }
  }

  .img-selected {
    transition: box-shadow .1s ease, transform .5s ease-out;
    -webkit-box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
    -moz-box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
    box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
  }

</style>
