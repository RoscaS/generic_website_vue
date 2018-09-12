<template>
  <div>
    <transition name="bounceLeft">
      <a class="no-tr burger-icon"
         @click="mobileModal = true"
         v-show="!mobileModal">
        <i class="far fa-bars fa-2x" :class="{'burger-nav': logo}"></i>
      </a>
    </transition>

    <MobileModal :links="links"
                 :mobileModal="mobileModal"
                 @closeModal="mobileModal = false">
    </MobileModal>
  </div>
</template>

<script>
	import GalleriesStore from "../Edit/Galleries/GalleriesStore";
	import MobileModal from "./MobileModal";

	export default {
		components: {MobileModal},
		props: {links: {type: Array}},
		name: "BurgerIcon",
		data: () => ({
			mobileModal: false,
		}),
		computed: {
			logo() { return GalleriesStore.logo; },
		},
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .burger-icon {
    position: absolute;
    right: 3%;
    padding-top: 30px;
    /*top: 23px;*/
  }

  .burger-nav {
    position: absolute;
    right: 5%;
    top: 23px;
  }


</style>
