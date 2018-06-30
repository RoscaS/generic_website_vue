<template>
  <div>
    <transition name="carousel-fade-in" appear>
      <carousel class="content">
        <carousel-slide v-for="i in slides" :key="i" :index="i-1">
          <h2><span></span></h2>
          <img :src="urls[i]">
        </carousel-slide>
      </carousel>
    </transition>
    <transition>
      <div class="down-arrow">
        <i class="fal fa-chevron-double-down"></i>
      </div>
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
      scrollWatch() {
        console.log(pageYOffset)
        console.log(this.downArrow)
        if(window.pageYOffset >= 165){
          this.downArrow.classList.remove('fadeInDown');
          this.downArrow.classList.add('fadeOutDown');
          window.removeEventListener('scroll', this.scrollWatch);
        }
      },

      setDownArrow() {
        setTimeout(() => {
          this.downArrow = document.getElementsByClassName('down-arrow')[0];
          Velocity(this.downArrow, {opacity: '1'});
          this.downArrow.classList.add('fadeInDown');
          setTimeout(() => {
            this.downArrow.classList.add('soft-bounce');
          }, 1000);
        }, 1800);
      }
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

      window.addEventListener('scroll', this.scrollWatch);
      this.setDownArrow();
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

  .soft-bounce {
    animation: softBounce .5s ease infinite;
  }

  @keyframes softBounce {
    0% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .down-arrow {
    opacity: 0;
    font-size: 50px;
    color: white;
    left: 49%;
    bottom: 150px;
    position: relative;

    i {
      cursor: pointer;
    }

  }

  .carousel {

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
      max-height: 600px;
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

</style>
