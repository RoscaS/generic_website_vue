<template>
<div class="nav-wrapper">
  <nav id="Navbar" class="has-background-white"
       :class="[{'setShadow': stiky }, {'logo': logo}]">

    <div class="level is-mobile">

      <div class="level-left">
        <Brand class="level-item" :stiky="stiky"/>
      </div>


      <div class="level-item is-hidden-mobile">
        <Links :links="links"/>
      </div>

      <div class="level-right logout is-hidden-mobile">
        <LogOut></LogOut>
      </div>

      <div class="is-hidden-tablet level-right">
        <NavbarMobile class="level-item" :links="links"/>
      </div>

    </div>
  </nav>
</div>
</template>

<script>
	import NavbarMobile from "./Mobile";
	import Brand from "./Brand";
	import Links from "./Links";
	import LogOut from "./Logout";
	import GalleriesStore from "../Edit/Galleries/GalleriesStore";

	export default {
		name: "Navbar",
		components: {LogOut, Links, Brand, NavbarMobile},
		props: {stiky: {type: Boolean}},
		data: () => ({
			initialDelay: true,
			links: [
				{id: "#Presentation", name: "Presentation", icon: "fa-info"},
				{id: "#Article", name: "Articles", icon: "fa-shopping-bag"},
				{id: "#Events", name: "Galerie", icon: "fa-th"},
				{id: "#Contact", name: "Contact", icon: "fa-envelope"}
			],
		}),
    computed: {
			logo() { return GalleriesStore.logo; },
    },
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .setShadow {
    transition: box-shadow .5s ease;
    box-shadow: 0px 4px 20px -1px rgba(0, 0, 0, 0.8);
  }

  .logo {
    padding: 0 !important;
    height: 68px !important;
    display: flex;
    justify-content: center;
  }

  #Navbar {
    margin-top: -50px;
    transition: box-shadow .5s ease;
    position: absolute;
    height: 50px;
    width: 100%;
    padding: 12px 0 0 0;

    @media screen and (max-width: 769px) {
      padding: 7px 0 0 0;
    }

    .level {
      .logout {
        position: absolute;
        right: 10px;
      }
    }
  }
</style>
