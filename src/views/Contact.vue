<template>
  <BaseLayout :store="store">
    <div class="columns is-multiline is-mobile">
      <div class="column left">
        <div v-scroll-reveal="sReveal('left', 100, 100, 2500)">
          <GoogleMap name="map"></GoogleMap>
        </div>
      </div>
      <div class="column right">
        <div class="info"
             v-scroll-reveal="sReveal('right', 50, 400, 1500)">
          <div class="line">
            <i class="fas fa-map-marker-alt fa-fw"></i>
            <a :href="site.google">{{ site.city }}</a>
          </div>

          <div class="line">
            <i class="fas fa-phone fa-fw"></i>
            <a :href="phoneHref">{{ site.phone }}</a>
          </div>

          <div class="line">
            <i class="fas fa-envelope fa-fw"></i>
            <a :href="mailHref">{{ site.mail }}</a>
          </div>
        </div>
        <p class="subtitle"
           :class="{'highlighted': highlighted(2)}"
           v-scroll-reveal="sReveal('right', 100, 200, 1500)">
          {{ state.sub_title2.data }}</p>
        <ContactForm url="message/"></ContactForm>
      </div>
    </div>
    <div class="has-text-centered">
      <p :class="{'highlighted': highlighted(3)}" class="subtitle"
         v-scroll-reveal="sReveal('left', 600, 200, 1500)">
        {{ state.sub_title3.data }}
      </p>
    </div>
  </BaseLayout>
</template>

<script>
  import SiteOptions from '../utils/siteSettings';
  import ViewsMixin from '../mixins/ViewsMixin';
  import ContactForm from '../components/Forms/ContactForm';
  import GoogleMap from '../components/Maps';

  export default {
    name: "Contact",
    mixins: [ViewsMixin],
    components: {ContactForm, GoogleMap},
    data() {
      return {
        site: SiteOptions,
        component: "Contact",
        type: 'text',
      };
    },
    computed: {
      phoneHref() { return `tel:${this.site.phone}`; },
      mailHref() { return `mailto:${this.site.mail}`; },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  .line {
    margin-bottom: 10px;
  }

  .subtitle {
    margin-top: 30px;
    margin-bottom: 10px;

    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    line-height: 25px;
    text-decoration: none solid rgb(255, 255, 255);
    word-spacing: 0;
    font-style: italic;
  }

</style>
