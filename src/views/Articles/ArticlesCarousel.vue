<template>
  <section>
    <div class="columns is-centered">
      <div class="carousel-wrapper" @click="showHelp">
        <carousel-3d ref="mycarousel"
                     :startIndex="0"
                     :controlsVisible="false"
                     :count="slides.length"
                     :space="space"
                     :width="width"
                     :height="height"
                     :clickable="false"
                     :minSwipeDistance="2000"
                     :border="0"
                     :display="13"
                     :animationSpeed="speed"
                     @before-slide-change="beforeChange">
          <slide v-for="(slide, i) in slides" :key="i" :index="i"
                 class="slide-wrapper">
            <img :src="slide.image">
          </slide>
        </carousel-3d>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import GalleriesStore from "../../components/Edit/Galleries/GalleriesStore";
import CategoriesStore from "../../components/Edit/Articles/CategoriesStore";
import Tools from "../../utils/tools";

export default {
  name: "ArticleCarousel",
  components: { Carousel3d, Slide },
  data: () => ({
    component: "Carousel",
    type: "image",

    width: 270,
    height: 180,
    space: 234,

    count: null,
    currentIdx: 0,
    jumpTo: 23,
    delta: null,
    direction: null,
    speed: 200,
    timeout: 50,
    moving: false,
    c: 0
  }),
  computed: {
    edit() {
      return GalleriesStore;
    },
    store() {
      return this.edit.getStore("Articles");
    },
    state() {
      return this.store.state;
    },
    categories() {
      return CategoriesStore.state.stores;
    },
    hoveredArticle() {
      return CategoriesStore.state.hoveredArticle;
    },

    slides() {
      if (this.store.hasLoaded) {
        this.count = this.store.images.length;
        return this.store.images;
      } else
        return setTimeout(() => {
          return this.slides;
        }, 100);
    }
  },
  watch: {
    hoveredArticle() {
      if (this.hoveredArticle) {
        let oldData = this.hoveredArticle;
        setTimeout(() => {
          if (this.hoveredArticle == oldData) {
            this.initJump(this.getIndex(this.hoveredArticle));
          }
        }, 300);
      }
    }
  },
  methods: {
    showHelp() {
      Tools.message("articlesHelp");
      this.$emit("flash");
    },
    getIndex(img) {
      let image = this.slides.find(i => i.id == img.id);
      return this.slides.indexOf(image);
    },
    next() {
      if (this.currentIdx == this.slides.length - 1) this._goToSlide(0);
      else this._goToSlide(this.currentIdx + 1);
    },
    previous() {
      if (this.currentIdx == 0) this._goToSlide(this.slides.length - 1);
      else this._goToSlide(this.currentIdx - 1);
    },
    initJump(idx) {
      this.jumpTo = idx;
      this.delta = this.jumpTo - this.currentIdx;
      this.jumpToSlide();
      this.c++;
    },
    setSpeed() {
      let delta = Math.abs(this.delta);
      if (delta <= 12) {
        this.speed = 800 - delta * 50;
        this.timeout = 300 - delta * 40;
      } else {
        this.speed = 200;
        this.timeout = 50;
      }
    },
    setDirection() {
      if (this.delta > 0) {
        let right = Math.abs(this.delta);
        let left = this.count - this.jumpTo + this.currentIdx;
        return right >= left ? this.previous() : this.next();
      } else {
        let right = this.count + this.jumpTo - this.currentIdx;
        let left = Math.abs(this.delta);
        return right >= left ? this.previous() : this.next();
      }
    },
    jumpToSlide(idx = this.currentIdx) {
      this.delta = this.jumpTo - this.currentIdx;
      this.setSpeed();
      if (this.currentIdx != this.jumpTo) {
        setTimeout(() => {
          this.setDirection();
          this.jumpToSlide(idx - 1);
        }, this.timeout);
      }
    },
    _goToSlide(idx) {
      this.$refs.mycarousel.goSlide(idx);
    },
    beforeChange(idx) {
      this.currentIdx = idx;
    }
  },
  mounted() {
    if (window.innerWidth < 900) {
      this.width = 200;
      this.height = 120;
      this.space = 150;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

section {
  margin: 0 0px -150px 0px;

  @media screen and (max-width: 960px) {
    /*margin-top: 0;*/
    margin-bottom: -105px;
  }
}

.columns {
  .carousel-wrapper {
    width: 815px;

    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }
}

img {
  object-fit: cover;
  width: 270px;
  height: 180px;
}

.slide-wrapper {
  border-radius: 10px;
}

.debug-articles {
  .control {
    margin-left: 20px;
    width: 120px;
  }
  .go {
    margin-left: 20px;
  }

  .level {
    max-width: 100%;
  }
}
</style>
