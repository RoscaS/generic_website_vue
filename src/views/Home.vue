<template>
  <div>
    <Modals id="Home"/>
    <PromoRibbon/>
    <Header/>
    <div id="StickyNav">
    <StickyNav/>
      <Carousel/>
      <Presentation/>
      <Hero/>
      <Parallax :idx="0" height="600px" text="Articles"/>
      <Articles/>
      <Parallax :idx="1" height="400px" text="Galerie"/>
      <Events/>
      <Parallax :idx="2" height="400px" text="Contact"/>
      <Contact/>
      <OpeningHours/>
      <!--<Review/>-->
      <Footer/>
    </div>
  </div>
</template>

<script>
	import Parallax from "../components/Parallax/Parallax";
	import PromoRibbon from "../views/Promo/PromoRibbon";
	import Carousel from "../views/Carousel";
	import Presentation from "../views/Presentation";
	import Articles from "../views/Articles/Articles";
	import Hero from "../views/Hero";
	import Events from "../views/Events/Events";
	import Contact from "../views/Contact";
	import Review from "../views/Review";
	import Footer from "../views/Footer";
	import StickyNav from "../components/Navbar/StickyNav";
	import Modals from "./Layouts/Modals";
	import Time from "../components/Edit/Time/TimeEditMenu";
	import OpeningHours from "./OpeningHours";
	import Header from "./Header/Header";

	export default {
		name: "Public",
		components: {
			OpeningHours,
			Time,
			Modals,
			StickyNav,
			Parallax,
			PromoRibbon,
			Header,
			Carousel,
			Presentation,
			Hero,
			Events,
			Articles,
			Contact,
			Review,
			Footer
		},
    mounted() {
	    this.$auth.setToken();
    }
	};
</script>

<style>
  body {
      overflow-x: hidden !important;
  }

</style>
