<template>
  <div>
    <Modals id="Home"/>
    <PromoRibbon/>
    <Header/>
    <div id="StickyNav">
    <StickyNav/>
      <Carousel/>
      <Presentation id="Presentation"/>
      <Hero/>
      <Parallax :idx="0" height="600px" text="Articles"/>
      <Articles id="Articles"/>
      <Parallax :idx="1" height="400px" text="Galerie"/>
      <Events id="Events"/>
      <Parallax :idx="2" height="400px" text="Contact"/>
      <Contact id="Contact"/>
      <OpeningHours/>
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
	import Footer from "../views/Footer";
	import StickyNav from "../components/Navbar/StickyNav";
	import Modals from "./Layouts/Modals";
	import Time from "../components/Edit/Time/TimeEditMenu";
	import OpeningHours from "./OpeningHours";
	import Header from "./Header/Header";

	import settings from '../site-settings';
	import Tools from "../utils/tools";

	export default {
		name: "Home",
    metaInfo: {
			title: settings.title,
      meta: [
        { name: 'author', content: 'Rosca Sol (JrosK)' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: settings.description },
        { name: "keywords", content: settings.keywords },

        // OpenGraph data (Most widely used)
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: settings.title },
        { property: 'og:site_name', content: settings.title },
        { property: 'og:url', content: settings.canonical },
        { property: 'og:description', content: settings.description},

        // Google / Schema.org markup:
        {itemprop: 'name', content: settings.title},
        {itemprop: 'description', content: settings.description},
        {itemprop: 'image', content: settings.canonical},


      ],
      link: [
        { rel: 'canonical', href: settings.canonical },
        { rel: 'icon', href: settings.icon },
      ]
    },
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
			Footer
		},
    mounted() {
			let auth = this.$auth;
	    auth.setToken();
	    if (auth.isAuthenticated() && auth.user.name === settings.admin){
	    	Tools.message('authUserIsAdmin')
      }
    }
	};
</script>

<style>
  body {
      overflow-x: hidden !important;
  }

</style>
