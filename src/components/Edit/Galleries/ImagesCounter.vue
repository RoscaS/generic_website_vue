<template>
  <b-taglist attached>
    <b-tag :type="color">{{ current }}</b-tag>
    <b-tag type="is-light">
      <span v-if="verbose">sur</span>
      {{ total }}
    </b-tag>
  </b-taglist>
</template>

<script>
  import {Toast} from 'buefy';

  export default {
    name: "ImagesCounter",
    props: {
      store: {type: Object},
      verbose: {type: Boolean, default: false},
    },
    data() {
      return {
        colors: [
          'is-warning',
          'is-success',
          'is-success',
        ],
      };
    },
    computed: {
      current() {
        return this.store.isEmpty ? 0 : this.store.count;
      },
      total() { return this.store.limit; },
      color() {
        let delta = this.total - this.current;
        if (delta >= 2) delta = 2;
        return this.colors[delta];
      }
    },
    watch: {
      current(value) {
        if (this.total == value && this.verbose && !this.timeOut) {
          let name = this.store.name;
          Toast.open({
            queue: false,
            duration: 3000,
            message: `Attention, la gallerie "${name}" est pleine!`,
            type: 'is-warning',
            position: 'is-top',
          });
        }
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
