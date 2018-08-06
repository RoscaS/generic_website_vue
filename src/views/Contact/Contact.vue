<template>
  <BaseLayout :id="$options.name"
              :title="state.title.data"
              :subTi="state.subTi.data"
              :state="state"
              :activeTab="activeTab"
              :loading="loading"
              @changeTab="activeTab=$event">
    <div class="columns">
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
            <a :href="siteSettings.google">{{ siteSettings.city }}</a>
          </div>

          <div class="line">
            <i class="fas fa-phone fa-fw"></i>
            <a :href="phoneHref">{{ siteSettings.phone }}</a>
          </div>

          <div class="line">
            <i class="fas fa-envelope fa-fw"></i>
            <a :href="mailHref">{{ siteSettings.mail }}</a>
          </div>
        </div>
        <p class="subT1"
           :class="{'highlighted': highlighted(2)}"
           v-scroll-reveal="sReveal('right', 100, 200, 1500)">
          {{ state.subT2.data }}</p>
        <ContactForm url="message/"></ContactForm>
      </div>
    </div>
    <div class="has-text-centered subT3">
      <p :class="{'highlighted': highlighted(3)}"
         v-scroll-reveal="sReveal('left', 600, 200, 1500)">
        {{ state.subT3.data }}
      </p>
    </div>
  </BaseLayout>
</template>

<script>
  import ContactStore from './ContactStore';
  import ContactForm from '../../components/Forms/ContactForm';
  import GoogleMap from '../../components/Maps';
  import mixin from '../../mixins/Public/PublicMixin';

  export default {
    name: "Contact",
    mixins: [mixin],
    components: {ContactForm, GoogleMap},
    data() {
      return {
        siteSettings: this.$Global.SiteSettings,
        store: ContactStore,
        state: {
          title: new this.Title(),
          subTi: new this.SubTitle('Sous titre 1'),
          subT2: new this.SubTitle('Sous titre 2'),
          subT3: new this.SubTitle('Sous titre 3'),
        },
      };
    },
    computed: {
      phoneHref() { return `tel:${this.siteSettings.phone}`; },
      mailHref() { return `mailto:${this.siteSettings.mail}`; },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .line {
    margin-bottom: 10px;
  }

  .subT2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .subT3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }

</style>
