<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="columns is-multiline is-mobile">
          <div class="column is-3 gallery-col"
               v-for="image in store.images"
               v-scroll-reveal="sReveal('left', 200, 100, 1500)">
            <a class="no-tr"
               :href="image.image"
               :description="image.description"
               v-lightbox>
              <img :src="image.image"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Lightbox/>
  </div>
</template>

<script>
  import ViewsMixin from '../../mixins/ViewsMixin';
  import Lightbox from '../../components/Lightbox/Lightbox';

  export default {
    name: "EventsGallery",
    mixins: [ViewsMixin],
    components: {Lightbox},
    data: () => ({
      component: 'Events',
      type: 'image',
      isAdmin: false,
    }),
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  img {
    border-radius: 8px;
    cursor: pointer;
    transition: box-shadow .5s ease, transform .5s ease-out;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    transform: scale(1);

    &:hover {
      transition: box-shadow .5s ease, transform .5s ease-out;
      -webkit-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      transform: scale(1.1);
    }
  }
</style>
