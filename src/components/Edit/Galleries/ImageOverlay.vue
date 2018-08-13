<template>
  <div @mouseover="showOverlay()" @mouseleave="hideOverlay()"
       class="container">
    <transition name="delayedFade"
                enter-active-class="fadeInDown"
                leave-active-class="fadeOutUp">
      <div class="overlay" v-if="overlay && !$parent.isDragging">
        <i class="fal fa-fw fa-pen-square" @click.prevent=""></i>
        <i class="fal fa-fw fa-times-square" @click.prevent=""></i>
      </div>
    </transition>
    <div class="image-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import GalleriesEditStore
    from '../../../components/Edit/Galleries/GalleriesEditStore';

  import 'vue2-animate/dist/vue2-animate.min.css';


  export default {
    name: "ImageOverlay",
    props: {
      isDragging: {type: Boolean},
    },
    data() {
      return {
        timeout: null,
        overlay: false,
      };
    },
    methods: {
      showOverlay() {
        this.timeout = setTimeout(() => {this.overlay = true;}, 250);
      },
      hideOverlay() {
        clearTimeout(this.timeout);
        setTimeout(() => { this.overlay = false;}, 100);
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  $animationDuration: .5s;
  @import "~vue2-animate/src/sass/vue2-animate";

  .image-slot {
    cursor: grab;
  }

  .overlay {
    background-color: $is-info;
    width: 100%;
    position: absolute;
    color: white;
    font-size: 22px;
    font-weight: lighter;

    i {
      position: relative;
      left: 69%;
      cursor: pointer;
    }

  }
</style>
