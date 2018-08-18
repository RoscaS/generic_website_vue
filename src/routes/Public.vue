<template>
  <div>
    <!--<PromoRibbon/>-->
    <Header/>
    <Navbar/>
    <Carousel/>
    <Presentation/>
    <!--<Hero/>-->
    <Parallax :idx="0" height="600px"/>
    <!--<Articles/>-->
    <Parallax :idx="1" height="400px"/>
    <!--<Events/>-->
    <Parallax :idx="2" height="400px"/>
    <!--<Contact/>-->
    <!--<Review/>-->
    <!--<Footer/>-->
  </div>
</template>

<script>
  import Login from '../components/Login/Login';

  import Parallax from '../components/Parallax/Parallax';

  import PromoRibbon from '../views/Promo/PromoRibbon';
  import Header from '../views/Header';
  import Navbar from '../views/Navbar';
  import Carousel from '../views/Carousel';
  import Presentation from '../views/Presentation';
  import Articles from '../views/Articles';
  import Hero from '../views/Hero';
  import Events from '../views/Events/Events';
  import Contact from '../views/Contact';
  import Review from '../views/Review';
  import Footer from '../views/Footer';

  import GalleriesStore from '../components/Edit/Galleries/GalleriesStore';
  // import TextsStore from '../components/Edit/Texts/TextsStore';
  import TextsStore from '../components/Edit/Texts/TTextsStore';
  import ArticlesStore from '../components/Edit/Articles/ArticlesStore';

  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Header, Navbar, Carousel, Presentation,
      Hero, Events, Articles, Contact, Review, Footer
    },
    created() {
      // TextsStore.fetchData();
      const Galleries = GalleriesStore;
      const Texts = TextsStore;
      const Articles = ArticlesStore;
    }
  };
</script>

<style scoped>

</style>
