<template>
  <div class="carousel-wrapper">
    <EditIcon :store="store" :edit="edit" top="10px"/>
    <transition name="carousel-fade-in" appear>
      <carouselApp class="content" :store="store">
        <carousel-slide v-for="i in slides()"
                        :key="i"
                        :index="i-1">
          <h2><span></span></h2>
          <img :src="getUrl(i-1)">
        </carousel-slide>
      </carouselApp>
    </transition>
  </div>
</template>

<script>
  import ViewsMixin from '../mixins/ViewsMixin';
  import EditIcon from '../components/Edit/EditIcon';
  import CarouselApp from '../components/Carousel/CarouselApp';
  import CarouselSlide from '../components/Carousel/CarouselSlide';

  export default {
    name: "Carousel",
    mixins: [ViewsMixin],
    components: {CarouselApp, CarouselSlide, EditIcon},
    data() {
      return {
        component: 'Carousel',
        type: 'image',
      };
    },
    methods: {
      getUrl(i) {
        if (this.state.images.length) {
          console.log(`i: ${i}`)
          return this.store.state.images[i].url
        } else {
          setTimeout(() => { this.getUrl(i) }, 10)
        }
      },
      slides() {
        console.log('ici');
        console.log(this.state.images.length)
        if (this.state.images.length) {
          return this.state.images.length;
        } else {
          setTimeout(() => { this.getSlidesNumber(); }, 10)
        }
      },
    }
  };
</script>

<style scoped lang="scss">
  .carousel-fade-in-enter-active, .carousel-fade-in-leave-active {
    transition: opacity 3s ease;
    transition-delay: 1.5s;
  }

  .carousel-fade-in-enter, .carousel-fade-in-leave-active {
    opacity: 0;
  }

  .carousel-wrapper {
    height: 600px;
    @media screen and (max-width: 1024px) {
      height: 305px;
    }
    @media screen and (max-width: 1280px) {
      height: 340px;
    }
    @media screen and (max-width: 1366px) {
      height: 320px;
    }
  }

  .carousel {
    margin-bottom: -50px !important;

    h2 {
      span {
        background-color: rgba(0, 0, 0, 0.51);
      }
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      top: 70%;
      color: #FFFFFF;
    }

    img {
      width: 100%;
      height: 525px;
      overflow: hidden;
      -o-object-fit: cover;
      object-fit: cover;

      @media screen and (max-width: 1024px) {
        height: 305px;
      }
      @media screen and (max-width: 1280px) {
        height: 340px;
      }
      @media screen and (max-width: 1366px) {
        height: 320px;
      }
    }
  }

</style>
