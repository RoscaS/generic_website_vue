<template>
  <div class="left-side"
       v-scroll-reveal="{
       origin: 'left',
       distance: '400px',
       duration: 1000,
       delay: 1500
       }">
    <TimeWidget></TimeWidget>
  </div>
</template>

<script>
	import TimeWidget from "./TimeWidget";
	export default {
		name: "LeftWidget",
		components: {TimeWidget},
	};
</script>

<style scoped lang="scss">
  @import '../../scss/global';

  .left-side {
    color: $top-text;
    font-size: 13px;
    padding: 10px 0 10px 0;
    border-top: 1px solid $accent;
    border-bottom: 1px solid $accent;
    text-align: right;
    position: relative;
    z-index: 6;

    @media screen and (max-width: 1087px) {
      border-top: none;
      border-bottom: none;
    }


  }

</style>
