<template>
  <ModalLayout component="parallax"
               :parallaxIdx="id"
               :classes="classes"
               top="650px"/>
</template>

<script>
  import ModalLayout from './ModalLayout'

  export default {
    name: "ParallaxEditModal",
    components: { ModalLayout },
    props: { id: {type: Number} },
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
