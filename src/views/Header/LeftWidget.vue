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
  @import "../../../static/sass/global";

  .left-side {
    color: $top-text;
    font-size: 13px;
    padding: 10px 0 10px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    text-align: right;

    @media screen and (max-width: 915px) {
      border-top: none;
      border-bottom: none;
    }
  }

</style>
