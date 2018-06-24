<template>
  <div>
    <transition name="carousel-fade-in" appear>
      <carousel class="content">
        <carousel-slide v-for="i in slides" :key="i" :index="i-1">
          <h2><span></span></h2>
          <!--<img :src="'../../../src/assets/carousel/00'+i+'.jpg'">-->
          <img :src="'https://picsum.photos/1920/1080?image='+i+2">

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
    data() {
      return {
        slides: 8,
      };
    },

    mounted() {
      axios
      .get('http://localhost:8000/images/')
      .then(response => {console.log(response.data)});
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

  .carousel {
    margin-top: 10px;
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
      max-height: 640px;
      overflow: hidden;
      -o-object-fit: cover;
      object-fit: cover;

      @media screen and (max-width: 1024px) {
        max-height: 305px;
      }
      @media screen and (max-width: 1280px) {
        max-height: 340px;
      }
      @media screen and (max-width: 1366px) {
        max-height: 320px;
      }

    }

  }

  .add-remove {
    margin-left: 20px;
  }

</style>
