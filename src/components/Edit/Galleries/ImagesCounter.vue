<template>
  <b-taglist attached class="wrapper">
    <b-tag :type="color">{{ current }}</b-tag>
    <b-tag type="is-light">
      <span v-if="verbose">sur</span>
      {{ total }}
    </b-tag>
  </b-taglist>
</template>

<script>
import { Toast } from "buefy";
import GalleriesStore from "./GalleriesStore";

export default {
  name: "ImagesCounter",
  props: {
    store: { type: Object },
    verbose: { type: Boolean, default: false }
  },
  data() {
    return {
      colors: ["is-warning", "is-success", "is-success"]
    };
  },
  computed: {
    edit() {
      return GalleriesStore;
    },
    current() {
      return this.store.isEmpty ? 0 : this.store.count();
    },
    total() {
      return this.store.limit;
    },
    color() {
      let delta = this.total - this.current;
      if (delta >= 2) delta = 2;
      return this.colors[delta];
    }
  },
  watch: {
    current(value) {
      console.log(value)
      this.checkIsFull(value);
      this.checkIsParallax();
    }
  },
  methods: {
    checkIsFull(value) {
      if (this.total === value && this.verbose && !this.timeOut) {
        let name = this.store.name;
        Toast.open({
          queue: false,
          duration: 3000,
          message: `Gallerie "${name}" pleine.`,
          type: "is-dark",
          position: "is-top"
        });
      }
    },
    checkIsParallax() {
      if (this.edit.primaryStore.name === "Parallax" && this.store.name === "Parallax") {
        if (this.store.count() < 3) {
          Toast.open({
            queue: false,
            duration: 6000,
            message: `Attention, il est important que la gallerie "Parallax" soit pleine pour un affichage correcte du site!`,
            type: "is-warning",
            position: "is-top"
          });
        }
      }
    }
  },
  mounted() {
    this.checkIsParallax();
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.wrapper {
  display: flex;
  flex-wrap: nowrap;
}
</style>
