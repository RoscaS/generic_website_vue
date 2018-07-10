<template>
  <section id="Contact">
    <SectionContainer :title="title" :sub-title="subTitle1">
      <div slot="content">
        <div class="columns">
          <div class="column left">
            <div v-scroll-reveal="{
                   origin: 'left',
                   distance: '100px',
                   duration: 2500,
                   delay: 100,
                   easing: 'ease',
                 }">
              <GoogleMap name="map"></GoogleMap>
            </div>
          </div>
          <div class="column right">
            <div class="info"
                 v-scroll-reveal="{
                   origin: 'right',
                   distance: '400px',
                   duration: 1500,
                   delay: 50,
                   easing: 'ease',
                 }">
              <div class="line">
                <i class="fas fa-map-marker-alt fa-fw"></i>
                <a :href="options.google">{{ options.city }}</a>
              </div>

              <div class="line">
                <i class="fas fa-phone fa-fw"></i>
                <a :href="phoneHref">{{ options.phone }}</a>
              </div>

              <div class="line">
                <i class="fas fa-envelope fa-fw"></i>
                <a :href="mailHref">{{ options.mail }}</a>
              </div>

            </div>
            <p class="subtitle2"
               v-scroll-reveal="{
                 origin: 'right',
                 distance: '200px',
                 duration: 1500,
                 delay: 100,
                 easing: 'ease',
               }">
              {{ subTitle2 }}</p>

            <ContactForm :url="urlPostMessage"></ContactForm>
          </div>
        </div>
      </div>
    </SectionContainer>
  </section>

</template>

<script>
  import SectionContainer from '../Components/SectionContainer';
  import Options from '../../options';
  import ContactForm from '../Components/Forms/ContactForm';
  import GoogleMap from '../Components/Maps';

  import axios from 'axios';

  export default {
    name: "Contact",
    components: {SectionContainer, ContactForm, GoogleMap},
    props: {
      url: {type: String},
      urlPostMessage: {type: String},
    },
    data() {
      return {
        options: Options,
        title: '',
        subTitle1: '',
        subTitle2: '',
        subTitle3: '',
      };
    },


    computed: {
      phoneHref() { return `tel:${this.options.phone}`; },
      mailHref() { return `mailto:${this.options.mail}`; },
    },

    mounted() {
      axios.get(this.url).then(response => {
        let data = response.data;
        this.title = data.title;
        this.subTitle1 = data.sub_title;
        this.subTitle2 = data.sub_title2;
        this.subTitle3 = data.sub_title3;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .line {
    margin-bottom: 10px;
  }

  .subtitle2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }

</style>
