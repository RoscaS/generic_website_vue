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
  import Login from './Login';

  import Parallax from '../components/Parallax/Parallax';

  import PromoRibbon from '../views/Promo/PromoRibbon';
  import Header from '../views/Header';
  import Navbar from '../views/Navbar';
  import Carousel from '../views/Carousel';
  import Presentation from '../views/Presentation';
  import Articles from '../views/Articles/Articles';
  import Hero from '../views/Hero';
  import Events from '../views/Events/Events';
  import Contact from '../views/Contact';
  import Review from '../views/Review';
  import Footer from '../views/Footer';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Header, Navbar, Carousel, Presentation,
      Hero, Events, Articles, Contact, Review, Footer
    },
    beforeCreate: () => {
    },
    created: () => {
    }
  };
</script>

<style scoped>

</style>
