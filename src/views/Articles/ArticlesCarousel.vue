<template>
  <section>
    <carousel-3d ref="mycarousel"
                 :startIndex="0"
                 :controlsVisible="false"
                 :count="slides.length"
                 :space="300"
                 :clickable="false"
                 :border="0"
                 :display="17"
                 :animationSpeed="speed"
                 @before-slide-change="beforeChange"
                 @after-slide-change="afterChange">
      <slide v-for="(slide, i) in slides" :key="i" :index="i">
        <img :src="slide.image" height="270px" width="360px">
      </slide>
    </carousel-3d>
  </section>
</template>

<script>
  import {Carousel3d, Slide} from 'vue-carousel-3d';
  import GalleriesStore from '../../components/Edit/Galleries/GalleriesStore';
  import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

  export default {
    name: "ArticleCarousel",
    components: {Carousel3d, Slide},
    data: () => ({
      component: 'Carousel',
      type: 'image',
      count: null,
      currentIdx: 0,
      jumpTo: 23,
      delta: null,
      direction: null,
      speed: 200,
      timeout: 50,
      moving: false,
      c: 0,
    }),
    computed: {
      edit() {return GalleriesStore;},
      store() {return this.edit.getStore('Articles');},
      state() {return this.store.state;},
      categories() {return CategoriesStore.state.stores;},
      hoveredImage() {return CategoriesStore.state.hoveredImage;},

      slides() {
        if (this.store.hasLoaded) {
          this.count = this.store.images.length;
          return this.store.images;
        }
        else return setTimeout(() => {return this.slides;}, 100);
      },
    },
    watch: {
      hoveredImage() {
        if (this.hoveredImage) {
          let oldData = this.hoveredImage;
          setTimeout(() => {
            if (this.hoveredImage == oldData) {
              this.initJump(this.getIndex(this.hoveredImage));
            }
          }, 300);
        }
      }
    },
    methods: {
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
        } else {
        }
      },
      _goToSlide(idx) {
        this.$refs.mycarousel.goSlide(idx);
      },
      beforeChange(idx) {
        this.currentIdx = idx;
      },
      afterChange(idx) {
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';


  section {
    margin: 20px 0px -150px 0px;
  }

  img {
    object-fit: cover;
    width: $article-width;
    height: $article-height;
    border-radius: 20px;
  }

  .debug-articles {
    .control {
      margin-left: 20px;
      width: 120px;
    }
    .go {
      margin-left: 20px;
    }

    .current {
      ul {
        transition: background-color .3s ease;
        background-color: #45a875;
      }
    }
    .level {
      max-width: 100%;
    }
    ul {
      transition: background-color .3s ease;
      border: 1px solid lightgray;
      margin: 0;
      padding: 5px;
    }
    li {
      list-style: none;
    }
  }
</style>


<!--<div class="debug-articles">-->
<!--<div class="level">-->
<!--<div class="level-item">-->
<!--<ul>-->
<!--<li><b>idx</b></li>-->
<!--<li><b>id</b></li>-->
<!--<li><b>pos</b></li>-->
<!--</ul>-->
<!--</div>-->
<!--<div v-for="(slide, i) in slides"-->
<!--class="level-item"-->
<!--:class="{current: currentIdx==getIndex(slide)}">-->
<!--<ul>-->
<!--<li>{{getIndex(slide)}}</li>-->
<!--<li>{{slide.id}}</li>-->
<!--<li>{{slide.position}}</li>-->
<!--</ul>-->
<!--</div>-->
<!--</div>-->
<!--<hr>-->
<!--<b-field grouped group-multiline>-->
<!--<button class="button is-outlined is-primary" @click="previous()"> <-->
<!--</button>-->
<!--<button class="button is-outlined is-primary" @click="next()"> >-->
<!--</button>-->
<!--<p class="control">-->
<!--<b-input type="number" :min="0" v-model="jumpTo"></b-input>-->
<!--</p>-->
<!--<button class="go button is-outlined is-primary" @click="initJump()">-->
<!--Go-->
<!--</button>-->
<!--<button class="go button is-outlined is-primary" @click="reset()">-->
<!--Reset-->
<!--</button>-->
<!--</b-field>-->
<!--</div>-->
