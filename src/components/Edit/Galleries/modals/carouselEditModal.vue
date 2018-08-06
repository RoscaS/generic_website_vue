<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Carousel
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis consequatur deleniti doloremque fugiat, itaque modi nobis quia reiciendis saepe soluta, voluptatem! Autem beatae eum fugit magni pariatur provident rem!
      </div>
    </div>
  </div>
</template>

<script>
  import GalleriesEditStore from '../GalleriesEditStore';

  export default {
    name: "carouselEditModal",
    props: {component: {type: String}},
    data() {
      return {
        isActive: true,
        edit: GalleriesEditStore,
      };
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

  .card {
    border-radius: 10px;
    width: 1024px;
  }
</style>
