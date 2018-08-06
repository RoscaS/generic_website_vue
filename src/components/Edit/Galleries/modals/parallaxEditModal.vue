<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Parallax
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Edit
      </div>
    </div>
  </div>
</template>

<script>
  import GalleriesEditStore from '../GalleriesEditStore';

  export default {
    name: "parallaxEditModal",
    props: {component: {type: String}},
    data() {
      return {
        edit: GalleriesEditStore,
      };
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

  /*.card {*/
  /*width: 1250px;*/
  /*}*/
</style>
