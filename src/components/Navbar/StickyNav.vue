<template>
  <affix class="nav-bar" relative-element-selector="#StickyNav"
         :offset="{ top: 50, bottom: 0 }" :scroll-affix="true"
         @affix="affixx()"
         @affixtop="affixTop()"
         @affixbottom="affixxBottom()">
    <Navbar :stiky="stiky"></Navbar>
  </affix>
</template>

<script>
	import Navbar from "./Navbar";
	import NavbarMobile from "./BurgerIcon";
	export default {
		name: "StickyNav",
		components: {NavbarMobile, Navbar},
		data: () => ({
			stiky: false
		}),
		methods: {
			affixx() {
				this.stiky = true;
				// console.log('affixx');
			},
			affixTop() {
				this.stiky = false;
				// console.log('top');
			},
			affixxBottom() {
				// console.log('bottom');
			},
		},
		computed: {
			dynamicTop: {
				get() {return {position: 'sticky'};},
				set(value) {}
			}

		},
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .nav-bar {
    width: 100%;

    height: 0;
    z-index: 3;
  }

</style>
