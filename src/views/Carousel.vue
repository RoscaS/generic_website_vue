<template>
<section>
  <EditIcon class="edit-icon" :store="store" :edit="edit" top="50px"/>
  <div class="carousel-top carousel-wrapper">
    <transition name="carousel-fade-in" appear>
      <vueper-slides :breakpoints="breakpoints"
                     class="shadow"
                     bullets-outside
                     :autoplay="false"
                     :parallax="true"
                     speed="10000"
                     :slideRatio="1/3.7"
                     transition-speed='1250'>
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
	import {VueperSlides, VueperSlide} from "vueperslides";
	import ViewsMixin from "../mixins/ViewsMixin";
	import EditIcon from "../components/Edit/EditIcon";

	export default {
		name: "Carousel",
		mixins: [ViewsMixin],
		components: {VueperSlides, VueperSlide, EditIcon},
		data: () => ({
			component: "Carousel",
			type: "image",
			breakpoints: {
				1600: {slideRatio: 1 / 3.1},
				1450: {slideRatio: 1 / 2.7},
				1367: {slideRatio: 1 / 3.7},
				1281: {slideRatio: 1 / 3.9},
				1025: {slideRatio: 1 / 3.2},
				1000: {slideRatio: 1 / 1.9 , arrows: false, touchable: true},
				915: {slideRatio: 1 / 1.7, arrows: false, touchable: true},
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
		}
	};
</script>

<style>

  .carousel-wrapper {
  margin-top: 50px;
  z-index: 0;
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
    z-index: 1;
    background-color: transparent;
    border: 1.5px solid #3d5b95;
    box-shadow: none;
    transition: 0.3s;
    width: 10px;
    height: 10px;
  }

  .carousel-top .vueperslides__bullet--active {
    z-index: 1;
    background-color: #3d5b95;
    width: 10px;
    height: 10px;
    /*border: none;*/
  }
</style>
