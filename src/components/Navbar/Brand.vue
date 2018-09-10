<template>
  <transition name="bounceLeft">
    <div id="Brand" v-if="stiky && !logo">
      <a class="no-tr" v-scroll-to="'#Home'">
        <h1 class="title">
          my<span>site</span>
        </h1>
      </a>
    </div>
    <div id="Logo" v-if="stiky && logo">
      <img class="logo" :src="logo">
    </div>
  </transition>
</template>

<script>
  import GalleriesStore from '../Edit/Galleries/GalleriesStore';

	export default {
		props: {stiky: {type: Boolean}},
		name: "Brand",
    computed: {
      logo() { return GalleriesStore.logo; },
    }
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  #Logo {
    position: absolute;
    z-index: 3;
    width: 170px;
    left: 150px;


    @media screen and (max-width: 1181px) {
      left: 50px;
    }

    @media screen and (max-width: 980px) {
      left: 5px;
    }
    @media screen and (max-width: 768px) {
      left: 80px;
    }

  }


  #Brand {
    position: absolute;
    z-index: 3;
    left: 10%;
    @media screen and (max-width: 1088px) {
      padding-top: 27px;
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
      font-size: 27px;
    }
  }
</style>
