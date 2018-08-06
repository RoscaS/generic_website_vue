<template>
  <div>
    <PromoRibbon/>
    <Header/>
    <Navbar/>
    <Carousel/>
    <Presentation/>
    <Hero/>
    <Parallax :url="base + parallax" :idx="0" :height="600"/>
    <Articles/>
    <Parallax :url="base + parallax" :idx="1" :height="400"/>
    <Gallery/>
    <Parallax :url="base + parallax" :idx="2" :height="400"/>
    <Contact/>
    <Review/>
    <Footer/>
  </div>
</template>

<script>
  import Login from '../components/Login/Login';

  import Parallax from '../components/Parallax';

  import PromoRibbon from '../views/Promo/PromoRibbon';
  import Header from '../views/Header/Header';
  import Navbar from '../views/Navbar/Navbar';
  import Carousel from '../views/Carousel/Carousel';
  import Presentation from '../views/Presentation/Presentation';
  import Articles from '../views/Articles/Articles';
  import Hero from '../views/Hero/Hero';
  import Gallery from '../views/Gallery/Gallery';
  import Contact from '../views/Contact/Contact';
  import Review from '../views/Review/Review';
  import Footer from '../views/Footer/Footer';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Header, Navbar, Carousel, Presentation,
      Hero, Gallery, Articles, Contact, Review, Footer
    },
    data() {
      return {
        title: 'first',

        base: 'http://localhost:8000/',

        parallax: 'galleries/parallax/',
        carousel: 'galleries/carousel/',
      };
    },
  };
</script>

<style scoped>

</style>
