<template>
  <div>
    <PromoRibbon/>
    <Top/>
    <Navbar/>
    <Carousel :url="base + carousel"/>
    <Presentation :url="base + presentation"/>
    <Hero :url="base + hero"/>
    <Parallax :url="base + parallax" :idx="0" :height="600"/>
    <Presentation :url="base + presentation"/>
    <Parallax :url="base + parallax" :idx="1" :height="400"/>
    <Gallery :url="base + gallery" :urlSectionData="base + galleryData"/>
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
  import Presentation from './Public/Presentation';
  import Hero from './Public/Hero';
  import Gallery from './Public/Gallery';
  import Contact from './Public/Contact';
  import Review from './Public/Review';
  import Footer from './Public/Footer';


  export default {
    name: "Public",
    components: {
      Login, Parallax, PromoRibbon, Top, Navbar, Carousel, Presentation,
      Hero, Gallery, Contact, Review, Footer,
    },
    data() {
      return {
        title: 'first',


        base: 'http://localhost:8000/',
        message: 'message/',

        parallax: 'galleries/parallax/',
        carousel: 'galleries/carousel/',
        promo: 'promo/1',
        presentation: 'presentation/1',
        hero: 'hero/1',
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
