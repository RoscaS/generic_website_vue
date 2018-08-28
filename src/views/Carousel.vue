<template>
<div class="carousel-top carousel-wrapper">
  <EditIcon class="edit-icon" :store="store" :edit="edit" top="50px"/>
  <transition name="carousel-fade-in" appear>
    <vueper-slides :breakpoints="breakpoints"
                   bullets-outside
                   :autoplay="false"
                   parallax
                   speed="10000"
                   :slideRatio="1/4"
                   transition-speed='1250'>
      <vueper-slide
        v-for="(slide, i) in slides" :key="i"
        :image="slide.image">
      </vueper-slide>
    </vueper-slides>
  </transition>
</div>
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
      1600: { slideRatio: 1 / 3.5 },
      1400: { slideRatio: 1 / 3 },
      1200: { slideRatio: 1 / 2.5 },
      1000: { slideRatio: 1 / 2 },
      600: { slideRatio: 1 / 1.5, arrows: false, touchable: true }
    }
  }),
  computed: {
    slides() {
      if (this.store.hasLoaded) return this.store.images;
      else
        return setTimeout(() => {
          return this.slides;
        }, 100);
    }
    // slides() {
    //   return this.store.images;
    // }
  }
};
</script>

<style>
.carousel-wrapper {
  margin-top: 51px;
}

.carousel-top .edit-icon {
  z-index: 3;
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
  background-color: transparent;
  border: 1.5px solid #3d5b95;
  box-shadow: none;
  transition: 0.3s;
  width: 10px;
  height: 10px;
}

.carousel-top .vueperslides__bullet--active {
  background-color: #3d5b95;
  width: 10px;
  height: 10px;
  /*border: none;*/
}
</style>
