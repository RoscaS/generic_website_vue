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
  export default {
    name: "ImagesCounter",
    props: {
      store: {type: Object},
      verbose: {type: Boolean, default: false},
    },
    data() {
      return {
        colors: [
          'is-danger',
          'is-warning',
          'is-success',
        ],
      }
    },
    computed: {
      current() { return this.store.count() },
      total() { return this.store.limit },
      color() {
        let delta = this.total - this.current;
        if (delta >= 2) delta = 2;
        return this.colors[delta]
      }
    },
    methods: {
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
