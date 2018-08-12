<template>
  <div class="lightbox" v-if="image" @click="close">
    <transition :name="transition">
      <lightbox-image :image="image" :key="image"></lightbox-image>
    </transition>
    <i class="fal fa-times fa-2x close"></i>
    <i class="far fa-chevron-right fa-3x arrows next"
       @click.stop.prevent="next"></i>
    <i class="far fa-chevron-left fa-3x arrows prev"
       @click.stop.prevent="prev"></i>

    <h2 class="description">{{ description }}</h2>
    <p class="counter">{{ index }}/{{ total }}</p>
  </div>
</template>

<script>
  import './LightboxDirective';
  import LightboxImage from './LightboxImage';
  import store from './LightboxStore';

  export default {
    name: "Lightbox",
    components: {LightboxImage},

    data() {
      return {
        state: store.state,
        direction: 'next',
      };
    },

    computed: {
      image() { return this.state.images[this.state.index]; },
      description() { return this.state.descriptions[this.state.index]; },
      index() { return this.state.index + 1; },
      total() { return this.state.images.length; },
      transition() { return 'lightbox-' + this.direction; }
    },

    methods: {

      enableScrolling() {
        window.onscroll = function() {};
      },

      close() {
        this.enableScrolling();
        store.close();
      },
      next() {
        this.direction = 'next';
        store.next();
      },
      prev() {
        this.direction = 'prev';
        store.prev();
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .lightbox {
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    background-color: rgba(#000, 0.9);

    .description {
      font-family: 'Open Sans', sans-serif;

      font-size: 30px;
      font-weight: 400;
      line-height: 39.6px;

      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: white;
      top: 90%;
      width: 100%;
    }

    .counter {
      position: fixed;
      color: white;
      top: 20px;
      left: 20px;
    }

    .arrows {
      transition: color .1s, transform .1s;
      color: #a3a3a3;
      cursor: pointer;
      position: fixed;
      top: 50%;
      margin-top: -40px;

      &:hover {
        transition: color .1s, transform .1s;
        color: #b6b6b6;
      }
      &.next {
        &:hover {
          animation: next-arrow .6s ease infinite;
        }
        right: 20px;
      }
      &.prev {
        &:hover {
          animation: prev-arrow .6s ease infinite;
        }
        left: 20px;
      }
    }

    @keyframes next-arrow {
      0% {transform: translate(0px);}
      60% {transform: translate(3px);}
      100% {transform: translate(0px);}
    }

    @keyframes prev-arrow {
      0% {transform: translate(0px);}
      60% {transform: translate(-3px);}
      100% {transform: translate(0px);}
    }

    .close {
      transition: color .2s, transform .2s;
      color: #a3a3a3;
      cursor: pointer;
      position: fixed;
      top: 20px;
      right: 20px;

      &:hover {
        transition: color .2s, transform .2s;
        color: #b6b6b6;
        transform: scale(1.1);
      }
    }
  }

  .lightbox-next-enter-active, .lightbox-next-leave-active {
    transition: transform .5s, opacity .5s;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .lightbox-next-enter-active {
    transition-delay: .3s;
  }

  .lightbox-next-enter {
    opacity: 0;
    transform: translateX(100px);
  }

  .lightbox-next-leave-active {
    opacity: 0;
    transform: translateX(-100px);
  }

  .lightbox-prev-enter-active, .lightbox-prev-leave-active {
    transition: transform .5s, opacity .5s;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .lightbox-prev-enter-active {
    transition-delay: .3s;
  }

  .lightbox-prev-enter {
    opacity: 0;
    transform: translateX(-100px);
  }

  .lightbox-prev-leave-active {
    opacity: 0;
    transform: translateX(100px);
  }
</style>
