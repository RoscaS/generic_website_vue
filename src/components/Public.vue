<template>
  <div>
    <PromoRibbon/>
    <Top/>
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
  import Login from './Components/Login/Login';

  import Parallax from './Components/Parallax';

  import PromoRibbon from './Public/Promo/PromoRibbon';
  import Top from './Public/Top';
  import Navbar from './Public/Navbar';
  import Carousel from './Public/Carousel/Carousel';
  import Presentation from './Public/Presentation/Presentation';
  import Articles from './Public/Articles';
  import Hero from './Public/Hero/Hero';
  import Gallery from './Public/Gallery/GalleryMain';
  import Contact from './Public/Contact/Contact';
  import Review from './Public/Review/Review';
  import Footer from './Public/Footer';


  import CarouselStore from './Public/Carousel/CarouselStore';
  import GalleryImageStore from './Public/Gallery/GalleryUser/GalleryImagesStore';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Top, Navbar, Carousel, Presentation,
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
    created() {
      CarouselStore.fetchData();
      GalleryImageStore.fetchData();
    }
  };
</script>

<style scoped>

</style>
