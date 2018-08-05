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
  import Login from '../components/Login/Login';

  import Parallax from '../components/Parallax';

  import PromoRibbon from '../views/Public/Promo/PromoRibbon';
  import Top from '../views/Public/Top';
  import Navbar from '../views/Public/Navbar';
  import Carousel from '../views/Public/Carousel/Carousel';
  import Presentation from '../views/Public/Presentation/Presentation';
  import Articles from '../views/Public/Articles';
  import Hero from '../views/Public/Hero/Hero';
  import Gallery from '../views/Public/Gallery/Gallery';
  import Contact from '../views/Public/Contact/Contact';
  import Review from '../views/Public/Review/Review';
  import Footer from '../views/Public/Footer';

  import ImageStore from '../components/GalleryManager/ImageStore';


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
      ImageStore.init()
    }
  };
</script>

<style scoped>

</style>
