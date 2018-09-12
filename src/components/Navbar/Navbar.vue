<template>
  <div id="Navbar" :class="[{'setShadow': stiky }, {'logo': logo}]">
    <div class="navbar-wrapper">
      <Brand class="brand" :stiky="stiky"/>
      <Links class="links is-hidden-touch" :links="links"/>
      <LogOut class="logout is-hidden-touch"/>
      <BurgerIcon class="burger-icon is-hidden-desktop" :links="links"/>
    </div>
  </div>
</template>

<script>
	import BurgerIcon from "./BurgerIcon";
	import Brand from "./Brand";
	import Links from "./Links";
	import LogOut from "./Logout";
	import GalleriesStore from "../Edit/Galleries/GalleriesStore";

	export default {
		name: "Navbar",
		components: {LogOut, Links, Brand, BurgerIcon},
		props: {stiky: {type: Boolean}},
		data: () => ({
			initialDelay: true,
			links: [
				{id: "#Presentation", name: "Presentation", icon: "fa-info"},
				{id: "#Articles", name: "Articles", icon: "fa-shopping-bag"},
				{id: "#Events", name: "Galerie", icon: "fa-th"},
				{id: "#Contact", name: "Contact", icon: "fa-envelope"},
				{id: "#Hours", name: "Horaire", icon: "fa-calendar-alt"},
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
    box-shadow: 0 4px 20px -1px rgba(0, 0, 0, 0.8);
  }

  .logo {
    padding: 0 !important;
    height: 68px !important;
    display: flex;
    justify-content: center;
  }

  #Navbar {
    background-color: white;
    position: absolute;
    margin-top: -50px;
    width: 100%;
    transition: box-shadow .5s ease;
    .navbar-wrapper {
      height: 50px;
      user-select: none;
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 100%;
      .brand {
        position: absolute;
        left: 5%;
      }
      .links {
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
      }
      .logout {
        position: absolute;
        right: 2%;
      }
      .burger-icon {
        padding-top: 3px;
        margin-left: auto;
        margin-right: 20px;
      }
    }
  }




</style>
