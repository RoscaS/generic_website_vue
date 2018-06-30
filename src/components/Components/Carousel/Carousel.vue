<template>
  <div class="carousel">
    <slot></slot>
    <a class="carousel__nav carousel__prev" @click.prevent="prev">
      <i class="fal fa-3x fa-chevron-left"></i>
    </a>
    <a class="carousel__nav carousel__next" @click.prevent="next">
      <i class="fal fa-3x fa-chevron-right"></i>
    </a>
    <div class="carousel__pagination">
      <a v-for="i in slidesCount"
         @click.prevent="goto(i-1)"
         :class="{active: i-1 === index}">
      </a>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        index: 0,
        slides: [],
        direction: 'right',
      };
    },

    watch: {
      slides(slides) {
        if (this.index >= this.slidesCount) {
          this.index = this.slidesCount -1;
        }
      }
    },

    computed: {
      slidesCount() { return this.slides.length; },
    },

    methods: {
      next() {
        this.index++;
        this.direction = 'right';
        if (this.index >= this.slidesCount) {
          this.index = 0;
        }
      },

      prev() {
        this.index--;
        this.direction = 'left';
        if (this.index < 0) {
          this.index = this.slidesCount - 1;
        }
      },

      goto(idx) {
        this.direction = idx> this.index? 'right': 'left';
        this.index = idx;
      },
    },


    mounted() { this.slides = this.$children; },

  };
</script>


<style scoped lang="scss">

  a {
    transition: color .5s ease;
    color: #fff;
    &:hover {
      transition: color .5s ease;
      color: #8b8b8b;
    }
  }

  .carousel {
    position: relative;
    overflow: hidden;

//    @media screen and (max-width: 376px) {
//      margin-top: -100px;
//    }

    .carousel__nav {
      transition: color .5s ease;
      position: absolute;
      top: 45%;
      left: 10px;

      &.carousel__prev {
      }
      &.carousel__next {
        right: 10px;
        left: auto;
      }

    }

    .carousel__pagination {
      position: static;
      bottom: 10px;
      left: 0;
      right: 0;
      text-align: center;

      a {
        transition: border .5s ease;
        padding: 0 10px 0 10px;
        border-bottom: 4px solid #8b8b8b;
        margin: 4px;

        &.active {
          transition: border .5s ease;
          /*border-bottom: 8px solid white;*/
          border-bottom: 8px solid lightgray;
        }

        &:hover {
          transition: border-color .5s ease;
          border-bottom-color: lightgray;
        }
      }
    }
  }

</style>
