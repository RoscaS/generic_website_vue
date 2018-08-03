<template>
  <div class="down-arrow-wrapper">
    <i class="down-arrow fal fa-chevron-double-down"
       v-scroll-to="{ el: '#Presentation', duration: 2000, offset: -80 }">
    </i>
  </div>
</template>

<script>
  export default {
    name: "DownArrow"
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .down-arrow-wrapper {
    position: absolute;
    left: 49%;
    animation: down-arrow .6s ease infinite;

    @keyframes down-arrow {
      0% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .down-arrow {
    opacity: 0;
    transition: color .5s ease;
    font-size: 50px;
    font-weight: normal;
    color: white;
    bottom: 140px;
    position: relative;
    cursor: pointer;

    &:hover {
      transition: color .5s ease;
      color: #d1d1d1;
    }
  }
</style>
