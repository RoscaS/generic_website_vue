<template>
  <div>
    <PromoRibbon/>
    <Top/>
    <Navbar/>
    <Carousel :url="base + carousel"/>
    <Presentation/>
    <Hero/>
    <Parallax :url="base + parallax" :idx="0" :height="600"/>
    <Articles/>
    <Parallax :url="base + parallax" :idx="1" :height="400"/>
    <Gallery/>
    <Parallax :url="base + parallax" :idx="2" :height="400"/>
    <Contact :url="base + contact" :urlPostMessage="base + message"/>
    <Review :url="base + review"/>
    <Footer/>
  </div>
</template>

<script>
  import Login from './Components/Login/Login';

  import Parallax from './Components/Parallax';

  import PromoRibbon from './Public/Promo/PromoRibbon';
  import Top from './Public/Top';
  import Navbar from './Public/Navbar';
  import Carousel from './Public/Carousel';
  import Presentation from './Public/Presentation/Presentation';
  import Articles from './Public/Articles';
  import Hero from './Public/Hero/Hero';
  import Gallery from './Public/Gallery/Gallery';
  import Contact from './Public/Contact';
  import Review from './Public/Review';
  import Footer from './Public/Footer';

  import GalleryManager from './Public/GalleryManager/GalleryManager';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Top, Navbar, Carousel, Presentation,
      Hero, Gallery, Articles, Contact, Review, Footer, GalleryManager
    },
    data() {
      return {
        title: 'first',

        base: 'http://localhost:8000/',
        message: 'message/',

        parallax: 'galleries/parallax/',
        carousel: 'galleries/carousel/',
        gallery: 'galleries/events/',
        galleryData: 'gallery/1',
        contact: 'contact/1',
        review: 'review/1',

      };
    }
  };
</script>

<style scoped>

</style>
