<template>
  <transition name="bounceLeft">
    <div id="Brand" v-if="stiky">
      <a class="no-tr" v-scroll-to="'#Home'">
        <h1 class="title">
          my<span>site</span>
        </h1>
      </a>
    </div>
  </transition>
</template>

<script>
	export default {
		props: {stiky: {type: Boolean}},
		name: "Brand",
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  #Brand {
    position: absolute;
    z-index: 3;
    margin: 0 10% 0 15%;

    @media screen and (max-width: 1000px) {
      margin: 0 10% 0 10%;
    }

    @media screen and (max-width: 800px) {
      margin: 0 10% 0 5%;
    }


    .title {
      color: $ribbon;

      & :first-child {
        background-color: $ribbon;
        color: white;
      }
    }

    h1 {
      cursor: pointer;
      transform: scale(1.3);

    }
  }
</style>
