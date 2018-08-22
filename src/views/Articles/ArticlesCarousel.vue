<template>
  <div>
    <carousel-3d ref="mycarousel"
                 :startIndex="0"
                 :controlsVisible="false"
                 :count="slides.length"
                 :space="300"
                 :clickable="false"
                 :border="0"
                 :display="9"
                 :animationSpeed="speed"
                 @before-slide-change="beforeChange">
      <slide v-for="(slide, i) in slides" :key="i" :index="i">
        <img :src="slide.image">
      </slide>
    </carousel-3d>
  </div>
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
      currentIdx: 0,
      jumpTo: 23,
      delta: null,
      direction: null,
      speed: 200,
      timeout: 50,
    }),
    computed: {
      edit() {return GalleriesStore;},
      store() {return this.edit.getStore('Articles');},
      state() {return this.store.state;},
      selectedArticle() {return CategoriesStore.state.selectedArticle;},

      slides() {
        if (this.store.hasLoaded) {
          return this.store.images;
        }
        else return setTimeout(() => {return this.slides;}, 100);
      },
    },
    watch: {
      seletedArticle(value) {
        console.log(`[watch] selectedArticle\tvalue: ${value}`);
        // this.jumpToSlide()
      }
    },
    methods: {
      reset() {
        this._goToSlide(0);
        this.jumpTo = 0;
      },
      getIndex(slide) {
        if (this.store.hasLoaded) return this.slides.indexOf(slide);
        else return setTimeout(() => {return this.getIndex(slide);}, 100);
      },
      next() {
        if (this.currentIdx == this.slides.length - 1) this._goToSlide(0);
        else this._goToSlide(this.currentIdx + 1);
      },
      previous() {
        if (this.currentIdx == 0) this._goToSlide(this.slides.length - 1);
        else this._goToSlide(this.currentIdx - 1);
      },
      jumpToSlide(idx = this.currentIdx) {
        this.delta = this.jumpTo - this.currentIdx;
        if (this.currentIdx != this.jumpTo) {
          setTimeout(() => {
            this.direction();
            this.jumpToSlide(idx - 1);
          }, this.timeout);
        } else {
          this.speed = 200;
          this.timeout = 50;
        }
      },
      _goToSlide(idx) {
        this.$refs.mycarousel.goSlide(idx);
      },
      beforeChange(idx) {
        this.currentIdx = idx;
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

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
