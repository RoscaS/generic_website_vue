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
    <Gallery/>
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

  import GalleryImagesStore from '../views/Gallery/GalleryImagesStore';
  import CarouselImagesStore from '../views/Carousel/CarouselImagesStore';
  import StockImagesStore from '../components/Edit/Galleries/Stock/StockImagesStore';
  import ParallaxImagesStore from '../components/Parallax/ParallaxImagesStore';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Header, Navbar, Carousel, Presentation,
      Hero, Gallery, Articles, Contact, Review, Footer, GalleryImagesStore,
      CarouselImagesStore, StockImagesStore, ParallaxImagesStore
    },
    mounted() {
      CarouselImagesStore.fetchData();
      ParallaxImagesStore.fetchData();
      GalleryImagesStore.fetchData();
      StockImagesStore.fetchData();
    }
  };
</script>

<style scoped>

</style>
