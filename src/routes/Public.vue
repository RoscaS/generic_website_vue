<template>
  <div>
    <PromoRibbon/>
    <Header/>
    <Navbar/>
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


  import GalleriesEditStore
    from '../components/Edit/Galleries/GalleriesEditStore';

  import TextsEditStore
    from '../components/Edit/Texts/TextsEditStore';

  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Header, Navbar, Carousel, Presentation,
      Hero, Events, Articles, Contact, Review, Footer,
      GalleriesEditStore, TextsEditStore,
    },
    mounted() {
      TextsEditStore.fetchData();
      GalleriesEditStore.fetchData();
    }
  };
</script>

<style scoped>

</style>
