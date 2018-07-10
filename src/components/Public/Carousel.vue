<template>
  <div class="carousel-wrapper">
    <transition name="carousel-fade-in" appear>
      <carousel class="content">
        <carousel-slide v-for="i in slides" :key="i" :index="i-1">
          <h2><span></span></h2>
          <img :src="urls[i]">
        </carousel-slide>
      </carousel>
    </transition>
  </div>
</template>

<script>
  import Carousel from '../Components/Carousel/Carousel';
  import CarouselSlide from '../Components/Carousel/CarouselSlide';

  import axios from 'axios';

  export default {
    name: "CarouselTop",
    components: {Carousel, CarouselSlide},
    props: {
      url: {type: String}
    },
    data() {
      return {
        downArrow: null,
        urls: [],
        slides: 8,
      };
    },

    methods: {

    },

    mounted() {
      axios.get(this.url).then(response => {
        let images = response.data.images;
        images.forEach(i => { this.urls.push(i.image); });
        this.slides = this.urls.length - 1;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });

    }
  };
</script>

<style scoped lang="scss">

  .carousel-fade-in-enter-active, .carousel-fade-in-leave-active {
    transition: opacity 3s ease;
    transition-delay: 1s;
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
      height: 600px;
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
