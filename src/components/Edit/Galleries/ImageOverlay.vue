<template>
  <div @mouseover="showOverlay()"
       @mouseleave="hideOverlay()"
       class="container">
    <transition name="delayedFade"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">
      <div class="overlay"
           v-if="overlay && !$parent.isDragging && !isPlaceholder">
        <i class="fal fa-fw fa-pen-square" @click.prevent="editDescription()"></i>
        <i class="fal fa-fw fa-times-square" @click.prevent="deleteImage()"></i>
      </div>
    </transition>
    <div class="image-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import 'vue2-animate/dist/vue2-animate.min.css';

  export default {
    name: "ImageOverlay",
    props: {
      image: {type: Object},
      edit: {type: Object},
    },
    data() {
      return {
        timeout: null,
        overlay: false,
      };
    },
    computed: {
      isPlaceholder() {
        return this.image.name.includes('placeholder');
      },
    },
    methods: {
      showOverlay() {
        this.timeout = setTimeout(() => {this.overlay = true;}, 250);
      },
      hideOverlay() {
        clearTimeout(this.timeout);
        setTimeout(() => { this.overlay = false;}, 100);
      },
      deleteImage() {
        this.image.delete();
      },
      editDescription() {
        this.edit.editItem = this.image;
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  $animationDuration: .5s;
  @import "~vue2-animate/src/sass/vue2-animate";

  .container {
    width: 190px;
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
