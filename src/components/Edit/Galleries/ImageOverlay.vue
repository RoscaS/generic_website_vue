<template>
  <div class="overlay-wrapper">
    <div class="overlay" v-if="!isPlaceholder">
      <div class="buttons-wrapper">
          <Ctrl class="ctrl-buttons" @modify="modify" @remove="remove"/>
      </div>
    </div>
    <img :src="image.image">
  </div>
</template>

<script>
import "vue2-animate/dist/vue2-animate.min.css";
import Ctrl from "../ControlButtons";
import GalleriesStore from "./GalleriesStore";

export default {
  name: "ImageOverlay",
  components: { Ctrl },
  props: {
    image: { type: Object }
  },
  data() {
    return {
      timeout: null,
      overlay: false
    };
  },
  computed: {
    edit() {
      return GalleriesStore;
    },
    isPlaceholder() {
      return this.image.name.includes("placeholder");
    }
  },
  methods: {
    modify() {
      this.edit.editItem = this.image;
    },
    remove() {
      this.image.delete();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.overlay-wrapper {
  position: relative;
  &:hover {
    .overlay {
      bottom: 75%;
      height: 25%;
    }
  }
}

img {
  display: block;
  object-fit: cover;
  width: $edit-width;
  height: $edit-height;
}

.overlay {
  opacity: 0.9;
  background-color: $is-info;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.5s ease;
}

.buttons-wrapper {
  display: flex;

  .ctrl-buttons {
    padding: 2px 4px 2px 0;
    margin-left: auto;
  }
}
</style>
