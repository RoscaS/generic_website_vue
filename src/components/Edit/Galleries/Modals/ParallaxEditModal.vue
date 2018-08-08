<template>
  <ImagesEditMenu component="parallax" :parallaxIdx="id"
                  :classes="classes" top="650px"/>
</template>

<script>
  import ImagesEditMenu from '../ImagesEditMenu';

  export default {
    name: "ParallaxEditModal",
    components: {ImagesEditMenu},
    props: {id: {type: Number}},
    data() {
      return {
        classes: [
          'level is-mobile', 'level-left',
          'level-item', 'level-item',
        ]
      };
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

</style>
