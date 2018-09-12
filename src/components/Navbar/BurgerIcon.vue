<template>
  <div>
    <transition name="bounceLeft">
      <a class="no-tr burger-icon"
         @click="mobileModal = true"
         v-show="!mobileModal">
        <i class="far fa-bars fa-2x"></i>
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


</style>
