<template>
  <div>
    <Modals id="Home"/>
    <PromoRibbon/>
    <Header/>
    <div id="StickyNav">
      <StickyNav/>
      <Carousel/>
      <!--<Presentation id="Presentation"/>-->
      <Presentation v-if="!siteAddons.genericSection" :id="idPresentation"/>
      <GenericSections v-if="siteAddons.genericSection" :id="idPresentation"/>
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
import GenericSections from "./GenericSections/GenericSections";

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

import settings from "../site-settings";
import Tools from "../utils/tools";

const rootLogo = settings.logo ? settings.logo.split(".")[0] : "favicon.ico";

export default {
  name: "Home",
  data: () => ({
    siteAddons: settings.siteAddons,
    idPresentation: 'Presentation',
  }),
  metaInfo: {
    title: settings.title,
    meta: [
      { name: "author", content: "Rosca Sol (JrosK)" },
      { name: "description", content: settings.description },
      { name: "keywords", content: settings.keywords },

      // OpenGraph data
      { property: "og:type", content: "website" },
      { property: "og:title", content: settings.title },
      { property: "og:site_name", content: settings.title },
      { property: "og:url", content: settings.canonical },
      { property: "og:description", content: settings.description },

      // Google / Schema.org markup:
      { itemprop: "name", content: settings.title },
      { itemprop: "description", content: settings.description },
      { itemprop: "image", content: rootLogo + ".jpg" }
    ],
    link: [
      { rel: "canonical", href: settings.canonical },
      { rel: "icon", href: rootLogo + ".ico" }
    ]
  },
  components: {
    GenericSections,
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
    if (auth.isAuthenticated() && auth.user.name === settings.admin) {
      Tools.message("authUserIsAdmin");
    }
  }
};
</script>

<style>
body {
  overflow-x: hidden !important;
}
</style>
