<template>
  <ImagesEditMenu component="events" :classes="classes"
                  primaryHeight="500px" top="790px"/>
</template>

<script>
  import ImagesEditMenu from '../ImagesEditMenu';

  export default {
    name: "EventsEditModal",
    components: {ImagesEditMenu},
    data() {
      return {
        classes: [
          '', '',
          'columns is-multiline center-content is-mobile',
          'column is-one-quarter'
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
