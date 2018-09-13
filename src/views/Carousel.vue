<template>
  <section>
    <EditIcon class="edit-icon" :store="store" :edit="edit" top="50px"/>
    <div class="carousel-top carousel-wrapper">
      <transition name="carousel-fade-in" appear>
        <vueper-slides ref="carouselTop"
                       :breakpoints="breakpoints"
                       class="shadow"
                       :autoplay="autoplay"
                       :speed="speed"
                       :parallax="true"
                       :dragging-distance="50"
                       :fixedHeight="fixedHeight"
                       transition-speed='600'>
          <vueper-slide v-for="(slide, i) in slides"
                        :key="i"
                        :image="slide.image">
          </vueper-slide>
        </vueper-slides>

      </transition>
    </div>
  </section>
</template>

<script>
import "vueperslides/dist/vueperslides.min.css";
import { VueperSlides, VueperSlide } from "vueperslides";
import ViewsMixin from "../mixins/ViewsMixin";
import EditIcon from "../components/Edit/EditIcon";

export default {
  name: "Carousel",
  mixins: [ViewsMixin],
  components: { VueperSlides, VueperSlide, EditIcon },
  data: () => ({
    component: "Carousel",
    type: "image",
    breakpoints: {
      915: { arrows: false, touchable: true }
    }
  }),
  computed: {
    slides() {
      if (this.store.hasLoaded) return this.store.images;
      else
        return setTimeout(() => {
          return this.slides;
        }, 100);
    },
    autoplay() {
      setTimeout(() => {
        this.$refs.carouselTop.goToSlide(0);
      }, 500);
      return this.$siteOptions.state.carousel_auto_scroll.data;
    },
    speed() {
      return this.$siteOptions.state.carousel_auto_scroll_speed.data;
    },
    fixedHeight() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      if (width <= 414) {
        return (3 / 7) * height + "px";
      } else {
        return height / 2 + "px";
      }
    }
  }
};
</script>

<style>
.carousel-wrapper {
  position: center;
  /*margin-top: 50px;*/
  /*z-index: 0;*/
}

.edit-icon {
  z-index: 2;
  position: absolute;
}

.carousel-top .carousel-fade-in-enter-active,
.carousel-top .carousel-fade-in-leave-active {
  transition: opacity 3s ease;
  transition-delay: 1.5s;
}

.carousel-top .carousel-fade-in-enter,
.carousel-top .carousel-fade-in-leave-active {
  opacity: 0;
}

.carousel-top .vueperslides__arrow {
  color: white;
  font-size: 60px;
}

.carousel-top .vueperslides__bullet {
  /*background-color: transparent;*/
  /*border: 1.5px solid #3d5b95;*/
  /*box-shadow: none;*/
  /*transition: 0.3s;*/
  /*width: 10px;*/
  /*height: 10px;*/
}

.carousel-top .vueperslides__bullet--active {
  /*z-index: 1;*/
  /*background-color: #3d5b95;*/
  /*width: 10px;*/
  /*height: 10px;*/
  /*border: none;*/
}
</style>
