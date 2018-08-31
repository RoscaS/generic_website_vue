<template>
  <div>
    <Modals/>

    <PromoRibbon/>
    <Header/>
    <StickyNav/>
    <div id="StickyNav">
      <Carousel/>
      <Presentation/>
      <Hero/>
      <Parallax :idx="0" height="600px"/>
      <Articles/>
      <Parallax :idx="1" height="400px"/>
      <Events/>
      <Parallax :idx="2" height="400px"/>
      <Contact/>
      <Review/>
      <Footer/>
    </div>
  </div>
</template>

<script>
	import Parallax from "../components/Parallax/Parallax";
	import PromoRibbon from "../views/Promo/PromoRibbon";
	import Header from "../views/Header";
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

	export default {
		name: "Public",
		components: {
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

<style scoped>
</style>
