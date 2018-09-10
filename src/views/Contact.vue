<template>
  <BaseLayout :store="store">
    <div class="columns is-multiline">
      <div class="column left">
        <div v-scroll-reveal="sReveal('left', 100, 100, 2500)">
          <GoogleMap name="map" class="map"></GoogleMap>
        </div>
      </div>
      <div class="column right">
        <div class="info"
             v-scroll-reveal="sReveal('right', 50, 400, 1500)">
          <div class="line">
            <i class="fas fa-map-marker-alt fa-fw"></i>
            <a :href="adressHref" target="_blank">{{ siteInfo.city.data }}</a>
          </div>

          <div class="line">
            <i class="fas fa-phone fa-fw"></i>
            <a :href="phoneHref">{{ siteInfo.phone.data }}</a>
          </div>

          <div class="line">
            <i class="fas fa-envelope fa-fw"></i>
            <a :href="mailHref">{{ siteInfo.mail.data }}</a>
          </div>
        </div>
        <p class="subtitle"
           :class="{'highlighted': highlighted(2)}"
           v-scroll-reveal="sReveal('right', 100, 200, 1500)">
          {{ state.sub_title2.data }}</p>

        <div id="Hours"></div>
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
  import ViewsMixin from '../mixins/ViewsMixin';
  import ContactForm from '../components/Forms/ContactForm';
  import GoogleMap from '../components/Maps';
  import TextsStore from "../components/Edit/Texts/TextsStore";

  export default {
    name: "Contact",
    mixins: [ViewsMixin],
    components: {ContactForm, GoogleMap},
    data() {
      return {
        component: "Contact",
        type: 'text',
      };
    },
    computed: {
      siteInfo() { return TextsStore.getStore("SiteInfo").state; },
      siteContact() { return TextsStore.getStore("SiteContact").state; },

      phoneHref() { return `tel:${this.siteInfo.phone.data}`; },
      mailHref() { return `mailto:${this.siteInfo.mail.data}`; },
      adressHref() {
        let adress = this.siteInfo.adress.data;
        let post = this.siteInfo.post_code.data;
        let city = this.siteInfo.city.data;
        let name = this.siteInfo.name.data;
        let google = 'https://www.google.ch/maps/search/';
      	return `${google}${name}+${adress}+${post}+${city}`;
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  i {
    color: $contact-icons;
    margin-right: 10px;
  }

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
