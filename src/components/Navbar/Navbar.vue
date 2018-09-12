<template>
<div class="nav-wrapper">
  <nav id="Navbar" class="has-background-white"
       :class="[{'setShadow': stiky }, {'logo': logo}]">

    <div class="">

      <!--<div class="level-left">-->
        <Brand :stiky="stiky"/>
      <!--</div>-->


      <div class="is-hidden-touch">
        <Links :links="links"/>
      </div>

      <div class="logout is-hidden-touch">
        <LogOut></LogOut>
      </div>

      <div class="is-hidden-desktop burger-icon level-right">
        <BurgerIcon class="level-item" :links="links"/>
      </div>

    </div>
  </nav>
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
    box-shadow: 0px 4px 20px -1px rgba(0, 0, 0, 0.8);
  }

  .logo {
    padding: 0 !important;
    height: 68px !important;
    display: flex;
    justify-content: center;
  }

  #Navbar {
    user-select: none;
    margin-top: -50px;
    transition: box-shadow .5s ease;
    position: absolute;
    height: 50px;
    width: 100%;
    padding: 12px 0 0 0;



    .level {
      .logout {
        position: absolute;
        right: 10px;
      }
    }
  }
</style>
